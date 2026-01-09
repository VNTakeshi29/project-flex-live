"use client";

import { useEffect, useRef } from "react";

type Options = {
  timeoutMs?: number;
};

export function useKeySequence(sequence: string[], onMatch: () => void, options: Options = {}) {
  const { timeoutMs = 3000 } = options;
  const bufferRef = useRef<Array<{ key: string; time: number }>>([]);
  const sequenceRef = useRef(sequence.map((item) => item.toUpperCase()));

  useEffect(() => {
    sequenceRef.current = sequence.map((item) => item.toUpperCase());
  }, [sequence]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const now = Date.now();
      bufferRef.current = [
        ...bufferRef.current,
        { key, time: now }
      ].filter((entry) => now - entry.time <= timeoutMs);

      const seq = sequenceRef.current;
      if (bufferRef.current.length < seq.length) {
        return;
      }

      const recent = bufferRef.current.slice(-seq.length).map((entry) => entry.key);
      const matched = recent.every((value, index) => value === seq[index]);
      if (matched) {
        bufferRef.current = [];
        onMatch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMatch, timeoutMs]);
}
