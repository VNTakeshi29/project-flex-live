"use client";

import { useEffect, useRef, useState } from "react";

type IdleOptions = {
  timeoutMs?: number;
};

export function useIdle(options: IdleOptions = {}) {
  const { timeoutMs = 20000 } = options;
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      setIdle(false);
      timerRef.current = window.setTimeout(() => {
        setIdle(true);
      }, timeoutMs);
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [timeoutMs]);

  return idle;
}
