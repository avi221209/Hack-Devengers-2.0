"use client";

import React from "react";
import { Check } from "lucide-react";
import { ThemeColor } from "@/lib/types";

interface ThemePickerProps {
  selectedTheme: ThemeColor;
  onChange: (theme: ThemeColor) => void;
}

const THEMES: { id: ThemeColor; name: string; desc: string; bg: string; border: string; text: string; primary: string }[] = [
  {
    id: "terracotta",
    name: "Terracotta",
    desc: "Warm local-business feel",
    bg: "bg-[#FFF7ED]",
    border: "border-[#C2410C]",
    text: "text-[#C2410C]",
    primary: "#C2410C",
  },
  {
    id: "mustard",
    name: "Mustard Gold",
    desc: "Friendly retail & food feel",
    bg: "bg-[#FEF3C7]",
    border: "border-[#D97706]",
    text: "text-[#D97706]",
    primary: "#D97706",
  },
  {
    id: "forest",
    name: "Forest Emerald",
    desc: "Clean healthcare & service feel",
    bg: "bg-[#F0FDF4]",
    border: "border-[#15803D]",
    text: "text-[#15803D]",
    primary: "#15803D",
  },
  {
    id: "clean",
    name: "Clean Indigo",
    desc: "Minimal modern style",
    bg: "bg-[#EEF2FF]",
    border: "border-[#4F46E5]",
    text: "text-[#4F46E5]",
    primary: "#4F46E5",
  },
  {
    id: "warm",
    name: "Warm Sunset",
    desc: "Rich vibrant boutique style",
    bg: "bg-[#FDF2F8]",
    border: "border-[#DB2777]",
    text: "text-[#DB2777]",
    primary: "#DB2777",
  },
];

export function ThemePicker({ selectedTheme, onChange }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {THEMES.map((theme) => {
        const isSelected = selectedTheme === theme.id;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            className={`tap-target p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
              isSelected
                ? `${theme.border} ${theme.bg} shadow-sm`
                : "border-[#E8DECB] bg-white hover:bg-[#FFFDF9]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full inline-block border shadow-2xs"
                  style={{ backgroundColor: theme.primary }}
                />
                <span className={`font-black text-sm ${isSelected ? theme.text : "text-[#1C1917]"}`}>
                  {theme.name}
                </span>
              </div>

              {isSelected && (
                <span className={`w-5 h-5 rounded-full ${theme.bg} ${theme.text} flex items-center justify-center shrink-0`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              )}
            </div>

            <p className="text-xs text-[#78716C]">{theme.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
