"use client";

import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { Mail, Phone, MapPin } from "lucide-react";
import { apiRequest } from "@/utils/api";
import { toast } from "react-toastify";

type ContactData = {
  email: string;
  phone: string;
  location: string;
};

const ContactSection = ({ clientId }: { clientId: string }) => {
  const [data, setData] = useState<ContactData>({
    email: "",
    phone: "",
    location: "",
  });

  const [originalData, setOriginalData] = useState<ContactData>({
    email: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!clientId) return;
    fetchData();
  }, [clientId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await apiRequest(`/api/client/contact/${clientId}`);
      const json = await res.json();

      if (!json.success) {
        throw new Error("Failed to fetch contact data");
      }

      const contact = {
        email: json.data?.email ?? "",
        phone: json.data?.phone ?? "",
        location: json.data?.location ?? "",
      };

      setData(contact);
      setOriginalData(contact);
    } catch (err) {
      toast.error("Failed to load contact details");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await apiRequest(
        `/api/client/contact/${clientId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        true, // 🔥 Send auth token
      );

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      setOriginalData(data);
      toast.success("Contact details updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to save contact details");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  /* ================= UI ================= */

  return (
    <SectionCard
      title="Contact Details"
      actions={
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      }
    >
      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <>
          {/* Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <PreviewCard
              icon={<Mail size={16} />}
              label="Email"
              value={data.email || "—"}
            />
            <PreviewCard
              icon={<Phone size={16} />}
              label="Phone"
              value={data.phone || "—"}
            />
            <PreviewCard
              icon={<MapPin size={16} />}
              label="Location"
              value={data.location || "—"}
            />
          </div>

          {/* Inputs */}
          <ModernInput
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={(v) => setData((p) => ({ ...p, email: v }))}
          />

          <ModernInput
            label="Phone"
            placeholder="+94 77 123 4567"
            value={data.phone}
            onChange={(v) => setData((p) => ({ ...p, phone: v }))}
          />

          <ModernInput
            label="Location"
            placeholder="Colombo, Sri Lanka"
            value={data.location}
            onChange={(v) => setData((p) => ({ ...p, location: v }))}
          />
        </>
      )}
    </SectionCard>
  );
};

export default ContactSection;

/* ================= UI COMPONENTS ================= */

function PreviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
        <span className="text-gray-500">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-black break-words">
        {value}
      </div>
    </div>
  );
}

function ModernInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
      />
    </div>
  );
}
