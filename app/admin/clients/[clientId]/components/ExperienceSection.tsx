"use client";

import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { Plus, Trash2, Pencil } from "lucide-react";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

type Experience = {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  logo?: string;
};

type Props = {
  clientId: string;
};

const API = process.env.NEXT_PUBLIC_API_URL as string;

export default function ExperienceSection({ clientId }: Props) {
  const [items, setItems] = useState<Experience[]>([]);
  const [originalItems, setOriginalItems] = useState<Experience[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  /* ================= OPTIMIZE CLOUDINARY IMAGE ================= */

  const optimizeImage = (url?: string) => {
    if (!url) return "";
    return url.replace("/upload/", "/upload/w_250,h_250,c_fill,q_auto,f_auto/");
  };

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!clientId) return;
    fetchData();
  }, [clientId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await apiRequest(`/api/client/experience/${clientId}`);
      const json = await res.json();

      if (json.success) {
        setItems(json.data || []);
        setOriginalItems(json.data || []);
      } else {
        setError("Failed to load experiences");
      }
    } catch {
      setError("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD ================= */

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        logo: "",
      },
    ]);
  };

  /* ================= CHANGE ================= */

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      if (field === "isCurrent" && value === true) {
        updated[index].endDate = "";
      }

      return updated;
    });
  };

  /* ================= REMOVE ================= */

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= LOGO UPLOAD ================= */

  const handleLogoUpload = async (index: number, file: File | null) => {
    if (!file || !clientId) return;

    const previewUrl = URL.createObjectURL(file);

    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], logo: previewUrl };
      return updated;
    });

    setUploadingIndex(index);

    try {
      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch(
        `${API}/api/client/experience/upload-logo/${clientId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const json = await res.json();

      if (!json.success) throw new Error("Upload failed");

      setItems((prev) => {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          logo: json.url,
        };

        return updated;
      });
    } catch {
      setError("Logo upload failed");

      setItems((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], logo: "" };
        return updated;
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!clientId) return;

    try {
      setSaving(true);
      setError("");

      const filtered = items.filter(
        (exp) => exp.position.trim() && exp.company.trim() && exp.startDate,
      );

      const res = await apiRequest(
        `/api/client/experience/${clientId}`,
        {
          method: "PUT",
          body: JSON.stringify({ experiences: filtered }),
        },
        true,
      );

      const json = await res.json();

      if (!json.success) throw new Error();

      setItems(json.data);
      setOriginalItems(json.data);
      setEditMode(false);
    } catch {
      setError("Failed to save experiences");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CANCEL ================= */

  const handleCancel = () => {
    setItems(originalItems);
    setEditMode(false);
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-black">
        Loading experiences...
      </div>
    );
  }

  return (
    <SectionCard
      title="Work Experience"
      description="Showcase your professional journey"
      actions={
        editMode ? (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-black text-black rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2"
          >
            <Pencil size={14} />
            Edit
          </button>
        )
      }
    >
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="space-y-6">
        {items.map((exp, index) => (
          <div
            key={index}
            className="border border-black rounded-2xl p-5 bg-white space-y-4"
          >
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-black overflow-hidden relative">
                {uploadingIndex === index && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs text-black">
                    Uploading...
                  </div>
                )}

                {exp.logo ? (
                  <img
                    src={optimizeImage(exp.logo)}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-black">
                    Logo
                  </div>
                )}
              </div>

              {editMode && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleLogoUpload(index, e.target.files?.[0] || null)
                    }
                    className="text-black"
                  />

                  <button
                    onClick={() => handleRemove(index)}
                    className="text-black hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>

            {/* POSITION */}
            <input
              disabled={!editMode}
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              placeholder="Position"
              className="w-full border border-black px-3 py-2 rounded-lg text-black"
            />

            {/* COMPANY */}
            <input
              disabled={!editMode}
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              placeholder="Company Name"
              className="w-full border border-black px-3 py-2 rounded-lg text-black"
            />

            {/* DATES */}
            <div className="flex gap-3">
              <input
                type="month"
                disabled={!editMode}
                value={exp.startDate}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
                className="w-full border border-black px-3 py-2 rounded-lg text-black"
              />

              {!exp.isCurrent && (
                <input
                  type="month"
                  disabled={!editMode}
                  value={exp.endDate || ""}
                  onChange={(e) =>
                    handleChange(index, "endDate", e.target.value)
                  }
                  className="w-full border border-black px-3 py-2 rounded-lg text-black"
                />
              )}
            </div>

            {/* CURRENT JOB */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!editMode}
                checked={exp.isCurrent}
                onChange={(e) =>
                  handleChange(index, "isCurrent", e.target.checked)
                }
              />

              <span className="text-sm text-black">Currently working here</span>
            </div>

            {/* DESCRIPTION */}
            <textarea
              disabled={!editMode}
              value={exp.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
              placeholder="Description"
              className="w-full border border-black px-3 py-2 rounded-lg resize-none text-black"
            />
          </div>
        ))}

        {editMode && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 text-black font-medium"
          >
            <Plus size={16} />
            Add Work Experience
          </button>
        )}
      </div>
    </SectionCard>
  );
}
