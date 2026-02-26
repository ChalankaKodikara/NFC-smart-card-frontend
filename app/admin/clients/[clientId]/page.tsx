"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";

import PersonalSection from "./components/PersonalSection";
import SocialSection from "./components/SocialSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import CustomSection from "./components/CustomSection";
import SortableWrapper from "./components/SortableWrapper";

export default function ProfileBuilder() {
  const params = useParams();

  const clientId = params.clientId as string;

  const [customSections, setCustomSections] = useState<any[]>([]);

  const addCustomSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      description: "",
      images: [],
    };
    setCustomSections([...customSections, newSection]);
  };

  const removeCustomSection = (id: string) => {
    setCustomSections(customSections.filter((sec) => sec.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-black">Profile Builder</h1>
          <p className="text-gray-500 mt-1">Customize your public portfolio</p>
        </div>

        {/* PERSONAL */}
        <SortableWrapper id="personal">
          <PersonalSection clientId={clientId} />
        </SortableWrapper>

        {/* SOCIAL */}
        <SortableWrapper id="social">
          <SocialSection clientId={clientId} />
        </SortableWrapper>

        {/* EXPERIENCE */}
        <SortableWrapper id="experience">
          <ExperienceSection clientId={clientId} />
        </SortableWrapper>

        {/* CONTACT */}
        <SortableWrapper id="contact">
          <ContactSection clientId={clientId} />
        </SortableWrapper>
      </div>
    </div>
  );
}
