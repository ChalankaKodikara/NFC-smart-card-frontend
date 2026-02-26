"use client";

import { useEffect, useState, useCallback } from "react";
import CustomSection, { CustomSectionType } from "./CustomSection";
import { apiRequest } from "@/utils/api";

type Props = {
  clientId: string;
};

export default function CustomSectionsPanel({ clientId }: Props) {
  const [sections, setSections] = useState<CustomSectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* ================= FETCH SECTIONS ================= */
  const fetchSections = useCallback(async (): Promise<void> => {
    if (!clientId) return;

    try {
      setLoading(true);

      const res = await apiRequest(`/api/client/custom/${clientId}`);
      const json: { success: boolean; data?: CustomSectionType[] } =
        await res.json();

      if (json.success) {
        setSections(json.data ?? []);
      }
    } catch (error: unknown) {
      console.error("Load error:", error);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  /* ================= ADD NEW SECTION ================= */
  const addNewSection = (): void => {
    const newSection: CustomSectionType = {
      id: String(Date.now()),
      title: "",
      subtitle: "",
      description: "",
      images: [],
    };

    // Instantly add in UI (user must click Save inside section)
    setSections((prev: CustomSectionType[]) => [
      newSection,
      ...prev,
    ]);
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="text-black">
        Loading custom sections...
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={addNewSection}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <div className="text-black">
          No custom sections yet.
        </div>
      )}

      {sections.map((sec: CustomSectionType) => (
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