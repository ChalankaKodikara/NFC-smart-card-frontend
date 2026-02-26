"use client";

import { useEffect, useState } from "react";

type Experience = {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  logo?: string;
};

type Props = {
  slug: string;
};

export default function ExperienceSection({ slug }: Props) {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/${slug}`,
        );
        const json = await res.json();

        if (json.success) {
          const sorted = (json.data?.experiences || []).sort(
            (a: Experience, b: Experience) => {
              // Current job always first
              if (a.isCurrent && !b.isCurrent) return -1;
              if (!a.isCurrent && b.isCurrent) return 1;

              // Otherwise sort by startDate descending
              return (
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
              );
            },
          );

          setExperiences(sorted);
        }
      } catch (err) {
        console.error("Experience fetch error:", err);
      }
    };

    fetchExperiences();
  }, [slug]);

  if (!experiences.length) return null;

  return (
    <div className="w-full px-6 mt-10">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[28px] p-8 md:p-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Professional
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            My Work Experience
          </h2>
        </div>

        {/* ================= MOBILE TIMELINE ================= */}
        <div className="md:hidden relative border-l border-gray-200 pl-6 space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Dot */}
              <div className="absolute -left-[9px] top-2 w-3 h-3 bg-yellow-500 rounded-full border-4 border-white shadow-md" />

              <h3 className="font-semibold text-gray-900">{exp.company}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
              </p>

              <h4 className="font-medium text-gray-800">{exp.position}</h4>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP TIMELINE ================= */}
        <div className="hidden md:block relative">
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative grid grid-cols-2 gap-12 items-start"
                >
                  {/* LEFT COLUMN */}
                  <div className={isLeft ? "text-right pr-10" : ""}>
                    {isLeft && (
                      <>
                        <h3 className="font-semibold text-gray-900">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.startDate} —{" "}
                          {exp.isCurrent ? "Present" : exp.endDate}
                        </p>
                      </>
                    )}
                  </div>

                  {/* DOT */}
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-md" />

                  {/* RIGHT COLUMN */}
                  <div className={!isLeft ? "pl-10" : ""}>
                    {!isLeft && (
                      <>
                        <h3 className="font-semibold text-gray-900">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.startDate} —{" "}
                          {exp.isCurrent ? "Present" : exp.endDate}
                        </p>
                      </>
                    )}

                    <h4 className="font-medium text-gray-800 mt-4">
                      {exp.position}
                    </h4>

                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
