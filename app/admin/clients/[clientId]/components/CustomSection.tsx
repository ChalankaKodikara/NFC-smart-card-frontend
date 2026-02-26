"use client";

import { useEffect, useMemo, useState } from "react";
import SectionCard from "./SectionCard";
import { Trash2, Upload, Pencil, X } from "lucide-react";
import { apiRequest } from "@/utils/api";

export type CustomSectionType = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
};

type Props = {
  clientId: string;
  section?: CustomSectionType;
  onDeleted?: () => void;
  onSaved?: () => void;
};

export default function CustomSection({
  clientId,
  section,
  onDeleted,
  onSaved,
}: Props) {
  const initialId = useMemo(
    () => (section?.id ? String(section.id) : String(Date.now())),
    [section?.id],
  );

  const [data, setData] = useState<CustomSectionType>({
    id: initialId,
    title: section?.title || "",
    subtitle: section?.subtitle || "",
    description: section?.description || "",
    images: section?.images || [],
  });

  const [editMode, setEditMode] = useState<boolean>(!section);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const [original, setOriginal] = useState<CustomSectionType>(data);

  useEffect(() => {
    if (!section) return;

    const normalized: CustomSectionType = {
      id: String(section.id),
      title: section.title || "",
      subtitle: section.subtitle || "",
      description: section.description || "",
      images: Array.isArray(section.images) ? section.images : [],
    };

    setData(normalized);
    setOriginal(normalized);
    setEditMode(false);
  }, [section]);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!clientId) return;

    if (!data.title.trim()) {
      alert("Section title is required");
      return;
    }

    try {
      setSaving(true);

      const res = await apiRequest(
        `/api/client/custom/${clientId}/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...data,
            title: data.title.trim(),
            subtitle: (data.subtitle || "").trim(),
          }),
        },
      );

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setOriginal(data);
      setEditMode(false);
      onSaved?.();
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!clientId) return;
    if (!confirm("Delete this section?")) return;

    try {
      const res = await apiRequest(
        `/api/client/custom/${clientId}/${data.id}`,
        { method: "DELETE" },
      );

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      onDeleted?.();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !clientId) return;

    if (data.images.length >= 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const previewIndex = data.images.length;

    setData((prev) => ({
      ...prev,
      images: [...prev.images, previewUrl],
    }));

    setUploadingIndex(previewIndex);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await apiRequest(
        `/api/client/custom/image/${clientId}/${data.id}`,
        { method: "POST", body: formData },
      );

      const json = await res.json();
      if (!json.success || !json.url) throw new Error("Upload failed");

      setData((prev) => {
        const updated = [...prev.images];
        updated[previewIndex] = json.url + "?t=" + Date.now();
        return { ...prev, images: updated };
      });
    } catch (err) {
      console.error("Upload error:", err);
      setData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== previewIndex),
      }));
      alert("Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  };

  const removeImage = (index: number) => {
    if (!editMode) return;
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <SectionCard
      title={data.title || "Custom Section"}
      actions={
        editMode ? (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setData(original);
                setEditMode(false);
              }}
              className="text-sm border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm bg-black text-white px-4 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button onClick={handleDelete}>
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="text-sm bg-black text-white px-4 py-2 rounded-lg flex gap-2 items-center"
          >
            <Pencil size={14} />
            Edit
          </button>
        )
      }
    >
      <ModernInput
        disabled={!editMode}
        label="Section Title"
        value={data.title}
        onChange={(value) => setData((prev) => ({ ...prev, title: value }))}
      />

      <ModernInput
        disabled={!editMode}
        label="Subtitle"
        value={data.subtitle || ""}
        onChange={(value) => setData((prev) => ({ ...prev, subtitle: value }))}
      />

      <ModernTextarea
        disabled={!editMode}
        label="Description"
        value={data.description}
        onChange={(value) =>
          setData((prev) => ({ ...prev, description: value }))
        }
      />

      {data.images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {data.images.map((img, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border"
            >
              <img
                src={img}
                className="w-full h-28 object-cover"
                alt="section"
              />
              {editMode && (
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {editMode && data.images.length < 5 && (
        <label className="flex items-center gap-2 border border-dashed py-3 rounded-xl cursor-pointer">
          <Upload size={16} />
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </SectionCard>
  );
}

/* ================= UI ================= */

type ModernInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function ModernInput({ label, value, onChange, disabled }: ModernInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input
        disabled={disabled}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-full border px-4 py-3 rounded-xl"
      />
    </div>
  );
}

type ModernTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function ModernTextarea({
  label,
  value,
  onChange,
  disabled,
}: ModernTextareaProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <textarea
        disabled={disabled}
        rows={4}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        className="w-full border px-4 py-3 rounded-xl resize-none"
      />
    </div>
  );
}
