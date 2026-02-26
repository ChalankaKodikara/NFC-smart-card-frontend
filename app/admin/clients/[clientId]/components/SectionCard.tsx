"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const SectionCard = ({
  title,
  description,
  children,
  actions,
  collapsible = false,
  defaultOpen = true,
}: SectionCardProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`flex items-start gap-3 ${
            collapsible ? "cursor-pointer" : ""
          }`}
          onClick={() => collapsible && setOpen(!open)}
        >
          {collapsible && (
            <ChevronDown
              size={18}
              className={`mt-1 transition-transform ${
                open ? "rotate-0" : "-rotate-90"
              }`}
            />
          )}

          <div>
            <h2 className="text-lg font-semibold text-black">{title}</h2>

            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* CONTENT */}
      {(!collapsible || open) && <div className="space-y-5">{children}</div>}
    </div>
  );
};

export default SectionCard;
