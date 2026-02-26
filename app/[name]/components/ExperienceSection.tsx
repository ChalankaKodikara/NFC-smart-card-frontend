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

  /* ================= CLOUDINARY OPTIMIZER ================= */
  const optimizeLogo = (url?: string) => {
    if (!url) return "";
    return url.replace("/upload/", "/upload/w_150,h_150,c_fill,q_auto,f_auto/");
  };

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
              if (a.isCurrent && !b.isCurrent) return -1;
              if (!a.isCurrent && b.isCurrent) return 1;

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
    <section className="px-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] p-10 shadow-xl">
        <div className="text-center mb-14">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Professional
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            My Work Experience
          </h2>
        </div>

        <div className="relative border-l border-gray-200 pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[10px] top-3 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-md" />

              <div className="flex items-start gap-4">
                {exp.logo && (
                  <img
                    src={optimizeLogo(exp.logo)}
                    alt={exp.company}
                    className="w-14 h-14 rounded-lg object-cover shadow-md"
                  />
                )}

                <div>
                  <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
                  </p>

                  <h4 className="font-medium text-gray-800 mt-2">
                    {exp.position}
                  </h4>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
