"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type PersonalData = {
  name: string;
  slogan: string;
  bio: string;
  profileImage?: string;
};

export default function PersonalSection({ clientId }: { clientId: string }) {
  const API = process.env.NEXT_PUBLIC_API_URL as string;

  const [data, setData] = useState<PersonalData>({
    name: "",
    slogan: "",
    bio: "",
    profileImage: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= OPTIMIZE CLOUDINARY IMAGE ================= */
  const optimizeImage = (url?: string) => {
    if (!url) return "/avatar-placeholder.png";

    return url.replace(
      "/upload/",
      "/upload/w_500,h_500,c_fill,q_auto,f_auto/"
    );
  };

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!clientId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/client/personal/${clientId}`);
        const json = await res.json();

        if (json.success) {
          setData(json.data || {});
        } else {
          toast.error("Profile not found");
        }
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [clientId]);

  /* ================= IMAGE PREVIEW ================= */
  const handleImageChange = (file: File) => {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    setSaving(true);

    try {
      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slogan", data.slogan);
      formData.append("bio", data.bio);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await fetch(`${API}/api/client/personal/${clientId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();

      if (!json.success) {
        toast.error("Save failed");
        return;
      }

      setData(json.data);
      setSelectedFile(null);
      setPreview(null);

      toast.success("Profile updated successfully ✅");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-xl shadow text-center text-black">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-8 border rounded-2xl bg-white space-y-6 shadow-lg max-w-3xl">
      <h2 className="text-2xl font-semibold text-black">Personal Profile</h2>

      {/* ================= IMAGE PREVIEW ================= */}
      <div className="flex items-center gap-6">
        <img
          src={
            preview
              ? preview
              : optimizeImage(data.profileImage)
          }
          alt="Profile"
          className="w-40 h-40 object-cover rounded-2xl border shadow-md"
        />

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Change Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageChange(e.target.files[0])
            }
            className="text-black"
          />
          <p className="text-xs text-gray-400 mt-2">
            Max size: 2MB (jpg, png recommended)
          </p>
        </div>
      </div>

      {/* ================= NAME ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Name
        </label>
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="border p-3 w-full rounded-lg text-black focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* ================= SLOGAN ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Slogan
        </label>
        <input
          value={data.slogan}
          onChange={(e) => setData({ ...data, slogan: e.target.value })}
          className="border p-3 w-full rounded-lg text-black focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* ================= BIO ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Bio
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          className="border p-3 w-full rounded-lg text-black min-h-[120px] focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}