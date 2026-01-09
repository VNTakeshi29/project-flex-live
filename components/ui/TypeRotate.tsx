"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypeRotateProps = {
  lines: string[];
  typeMs?: number;
  deleteMs?: number;
  startDelayMs?: number;
  holdMs?: number;
  cursor?: boolean;
  className?: string;
};

type Phase = "typing" | "holding" | "deleting";

export default function TypeRotate({
  lines,
  typeMs = 90,
  deleteMs = 60,
  startDelayMs = 500,
  holdMs = 2000,
  cursor = true,
  className
}: TypeRotateProps) {
  const reduceMotion = useReducedMotion();
  const linesKey = useMemo(() => lines.join("\n"), [lines]);
  const linesRef = useRef(lines);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    linesRef.current = lines;
    setLineIndex(0);
    setCharIndex(0);
    setPhase("typing");
    clearTimer();
  }, [linesKey, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    if (!linesRef.current.length) {
      return;
    }

    const currentLine = linesRef.current[lineIndex] ?? "";

    if (phase === "typing") {
      const nextChar = currentLine.charAt(charIndex);
      let delay = charIndex === 0 ? startDelayMs : typeMs;
      if (nextChar === ",") {
        delay += 350;
      } else if (nextChar === ".") {
        delay += 900;
      }
      delay = Math.max(0, delay);
      clearTimer();
      timeoutRef.current = window.setTimeout(() => {
        const nextIndex = charIndex + 1;
        if (nextIndex >= currentLine.length) {
          setCharIndex(currentLine.length);
          setPhase("holding");
        } else {
          setCharIndex(nextIndex);
        }
      }, delay);
      return;
    }

    if (phase === "holding") {
      clearTimer();
      timeoutRef.current = window.setTimeout(() => {
        setPhase("deleting");
      }, Math.max(0, holdMs));
      return;
    }

    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      const nextIndex = charIndex - 1;
      if (nextIndex <= 0) {
        setCharIndex(0);
        setPhase("typing");
        setLineIndex((prev) => (prev + 1) % linesRef.current.length);
      } else {
        setCharIndex(nextIndex);
      }
    }, Math.max(0, deleteMs));
  }, [
    charIndex,
    deleteMs,
    holdMs,
    lineIndex,
    linesKey,
    phase,
    reduceMotion,
    startDelayMs,
    typeMs
  ]);

  if (!lines.length) {
    return null;
  }

  if (reduceMotion) {
    return <span className={cn(className)}>{lines[0]}</span>;
  }

  const currentLine = lines[lineIndex] ?? "";
  const visible = currentLine.slice(0, charIndex);
  const isActive = phase === "typing" || phase === "deleting";

  return (
    <span className={cn("inline-flex items-baseline", className)} aria-label={currentLine}>
      <span style={{ whiteSpace: "pre-wrap" }}>{visible}</span>
      {cursor ? (
        <span
          className={cn(
            "ml-[2px] inline-block h-[1em] w-[2px] rounded bg-white/60",
            isActive ? "opacity-100 animate-pulse" : "opacity-0"
          )}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
