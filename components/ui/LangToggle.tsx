"use client";

import { motion } from "framer-motion";
import { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LangToggleProps = {
  value: Language;
  onChange: (value: Language) => void;
};

export default function LangToggle({ value, onChange }: LangToggleProps) {
  const options: Array<{ label: string; value: Language }> = [
    { label: "EN", value: "en" },
    { label: "VN", value: "vn" }
  ];

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "relative z-10 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] transition",
            value === option.value ? "text-white" : "text-white/50"
          )}
        >
          {option.label}
        </button>
      ))}
      <motion.span
        className="absolute left-1 top-1 h-[26px] w-[44px] rounded-full border border-white/15 bg-white/10"
        animate={{ x: value === "en" ? 0 : 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
    </div>
  );
}
