"use client";

import { cn } from "@/lib/utils";

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

export default function Toggle({ label, value, onChange, className }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cn(
        "flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-slate-600 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20",
        className
      )}
    >
      <span>{label}</span>
      <span className="relative h-5 w-10 rounded-full bg-slate-900/10 dark:bg-black/40">
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-slate-900 transition dark:bg-white",
            value ? "left-[22px] bg-neon-cyan dark:bg-neon-cyan" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}
