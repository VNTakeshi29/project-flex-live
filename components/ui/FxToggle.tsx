"use client";

import Toggle from "@/components/ui/Toggle";

type FxToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function FxToggle({ value, onChange }: FxToggleProps) {
  return <Toggle label={`FX: ${value ? "ON" : "OFF"}`} value={value} onChange={onChange} />;
}
