"use client";

import { useEffect, useState } from "react";
import {
  Linkedin,
  Instagram,
  Github,
  Globe,
  Facebook,
  Twitter,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { apiRequest } from "@/utils/api";

type SocialLink = {
  platform: string;
  url: string;
};

type Props = {
  clientId: string;
};

const platformIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
  github: <Github size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  website: <Globe size={18} />,
};

const detectPlatform = (url: string) => {
  const u = url.toLowerCase();
  if (u.includes("linkedin.com")) return "linkedin";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("github.com")) return "github";
  if (u.includes("facebook.com")) return "facebook";
  if (u.includes("twitter.com") || u.includes("x.com")) return "twitter";
  return "website";
};

export default function SocialSection({ clientId }: Props) {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [originalLinks, setOriginalLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!clientId) return;
    fetchSocial();
  }, [clientId]);

  const fetchSocial = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await apiRequest(`/api/client/social/${clientId}`);
      const json = await res.json();

      if (!json.success) {
        throw new Error("Failed to fetch");
      }

      setLinks(json.data || []);
      setOriginalLinks(json.data || []);
    } catch {
      setError("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CRUD ================= */

  const handleAdd = () => {
    setLinks((prev) => [...prev, { platform: "website", url: "" }]);
  };

  const handleChange = (index: number, value: string) => {
    const updated = [...links];
    const trimmed = value.trim();

    updated[index] = {
      url: trimmed,
      platform: detectPlatform(trimmed),
    };

    setLinks(updated);
  };

  const handleRemove = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const filtered = links
        .map((l) => ({
          platform: l.platform,
          url: l.url.trim(),
        }))
        .filter((l) => l.url !== "");

      const res = await apiRequest(
        `/api/client/social/${clientId}`,
        {
          method: "PUT",
          body: JSON.stringify({ links: filtered }),
        },
        true,
      );

      const json = await res.json();

      if (!json.success) {
        throw new Error("Save failed");
      }

      setLinks(json.data || []);
      setOriginalLinks(json.data || []);
      setEditMode(false);
    } catch {
      setError("Failed to save social links");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setLinks(originalLinks);
    setEditMode(false);
  };

  const hasChanges = JSON.stringify(links) !== JSON.stringify(originalLinks);

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-black">
        Loading social links...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6 text-black">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-black">Social Media</h2>
          <p className="text-black opacity-60 text-sm">
            Add your public social profile links
          </p>
        </div>

        {editMode ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-black rounded-lg text-sm text-black"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm flex items-center gap-2"
          >
            <Pencil size={14} />
            Edit
          </button>
        )}
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="space-y-4">
        {links.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border border-black rounded-xl px-4 py-3"
          >
            <span className="text-black">
              {platformIcons[item.platform] || <Globe size={18} />}
            </span>

            <input
              value={item.url}
              disabled={!editMode}
              placeholder="Paste social media URL..."
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 outline-none text-black placeholder:text-black placeholder:opacity-50 disabled:text-black"
            />

            {editMode && (
              <button
                onClick={() => handleRemove(index)}
                className="text-black hover:text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {editMode && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 text-black font-medium hover:opacity-70 transition"
          >
            <Plus size={16} />
            Add Social Link
          </button>
        )}
      </div>
    </div>
  );
}
