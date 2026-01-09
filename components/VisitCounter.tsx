"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLiveStats } from "@/lib/hooks/useLiveStats";

function useCountUp(target: number | null, duration = 600) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === null) {
      setDisplay(null);
      return;
    }
    if (reduceMotion) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const from = display ?? 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const value = Math.round(from + (target - from) * progress);
      setDisplay(value);
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [duration, reduceMotion, target]);

  return display;
}

export default function VisitCounter() {
  const { totalViews, uniqueVisitors, loading } = useLiveStats();

  const displayViews = useCountUp(totalViews);
  const displayVisitors = useCountUp(uniqueVisitors);
  const formattedViews = useMemo(
    () => (loading ? "..." : displayViews === null ? "--" : displayViews.toLocaleString()),
    [displayViews, loading]
  );
  const formattedVisitors = useMemo(
    () => (loading ? "..." : displayVisitors === null ? "--" : displayVisitors.toLocaleString()),
    [displayVisitors, loading]
  );

  return (
    <div className="glass rounded-2xl border border-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">Live stats</p>
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-slate-700 dark:text-white/80">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">
            Total views
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{formattedViews}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">
            Unique visitors
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{formattedVisitors}</p>
        </div>
      </div>
    </div>
  );
}
