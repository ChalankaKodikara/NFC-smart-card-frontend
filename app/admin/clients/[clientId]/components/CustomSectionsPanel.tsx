"use client";

import { useEffect, useState } from "react";
import CustomSection, { CustomSectionType } from "./CustomSection";
import { apiRequest } from "@/utils/api";

type Props = {
  clientId: string;
};

export default function CustomSectionsPanel({ clientId }: Props) {
  const [sections, setSections] = useState<CustomSectionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    fetchSections();
  }, [clientId]);

  const fetchSections = async () => {
    try {
      setLoading(true);

      const res = await apiRequest(`/api/client/custom/${clientId}`);

      const json = await res.json();

      if (json.success) {
        setSections(json.data || []);
      }
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNewSection = () => {
    const newSection: CustomSectionType = {
      id: String(Date.now()),
      title: "",
      subtitle: "",
      description: "",
      images: [],
    };

    // Add instantly in UI (user must click Save)
    setSections((prev) => [newSection, ...prev]);
  };

  if (loading)
    return <div className="text-black">Loading custom sections...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={addNewSection}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <div className="text-black">No custom sections yet.</div>
      )}

      {sections.map((sec) => (
        <CustomSection
          key={sec.id}
          clientId={clientId}
          section={sec}
          onDeleted={fetchSections}
          onSaved={fetchSections}
        />
      ))}
    </div>
  );
}
