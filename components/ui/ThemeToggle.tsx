"use client";

import Toggle from "@/components/ui/Toggle";

type ThemeToggleProps = {
  value: "dark" | "light";
  onChange: (value: "dark" | "light") => void;
};

export default function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  return (
    <Toggle
      label={`Theme: ${value === "dark" ? "Dark" : "Light"}`}
      value={value === "dark"}
      onChange={(next) => onChange(next ? "dark" : "light")}
    />
  );
}
