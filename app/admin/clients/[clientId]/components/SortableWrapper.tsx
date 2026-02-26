"use client";

import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";

interface SortableWrapperProps {
  id: string;
  children: ReactNode;
}

export default function SortableWrapper({
  id,
  children,
}: SortableWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* DRAG HANDLE */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-6 opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing p-2 rounded-lg hover:bg-gray-100"
      >
        <GripVertical size={18} className="text-gray-400" />
      </div>

      {/* CONTENT */}
      <div className="transition transform group-hover:scale-[1.01] duration-200">
        {children}
      </div>
    </div>
  );
}
