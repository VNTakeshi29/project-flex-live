"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CursorSpotlight({ enabled }: { enabled: boolean }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(finePointer);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion || !isDesktop) {
      return;
    }

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        const element = containerRef.current;
        if (!element) {
          return;
        }
        element.style.background = `radial-gradient(420px at ${event.clientX}px ${event.clientY}px, rgba(70, 243, 255, 0.12), transparent 60%)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [enabled, reduceMotion, isDesktop]);

  if (!enabled || reduceMotion || !isDesktop) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
