"use client";

import { useEffect, useRef } from "react";

type ScrollDepthHandlers = {
  onSeventy?: () => void;
  onBottom?: () => void;
};

export function useScrollDepth({ onSeventy, onBottom }: ScrollDepthHandlers) {
  const firedSeventy = useRef(false);
  const firedBottom = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? scrollTop / max : 1;

      if (!firedSeventy.current && progress >= 0.7) {
        firedSeventy.current = true;
        onSeventy?.();
      }

      if (!firedBottom.current && progress >= 0.98) {
        firedBottom.current = true;
        onBottom?.();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onBottom, onSeventy]);
}
