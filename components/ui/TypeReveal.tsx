"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delayMs?: number; // ms per character
  startDelayMs?: number;
  showCursor?: boolean;
};

export default function TypeReveal({
  text,
  className,
  delayMs = 38,
  startDelayMs = 250,
  showCursor = true
}: Props) {
  const [i, setI] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    setI(0);

    if (startRef.current) window.clearTimeout(startRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    startRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setI((prev) => {
          const next = prev + 1;
          if (next >= text.length) {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            intervalRef.current = null;
            return text.length;
          }
          return next;
        });
      }, delayMs);
    }, startDelayMs);

    return () => {
      if (startRef.current) window.clearTimeout(startRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      startRef.current = null;
      intervalRef.current = null;
    };
  }, [text, delayMs, startDelayMs]);

  const done = i >= text.length;
  const visible = text.slice(0, i);

  return (
    <span className={cn("inline-flex items-baseline", className)} aria-label={text}>
      <span style={{ whiteSpace: "pre-wrap" }}>{visible}</span>

      {showCursor && (
        <span
          className={cn(
            "ml-[2px] inline-block h-[1em] w-[2px] rounded bg-white/60",
            done ? "opacity-0" : "opacity-100 animate-pulse"
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
