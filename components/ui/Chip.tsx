"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
        active ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
      )}
    >
      {active ? (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-full border border-slate-200/80 bg-white/70 dark:border-white/20 dark:bg-white/10"
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
