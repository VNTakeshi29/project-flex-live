"use client";

import { useEffect, useState } from "react";
import { fetchTotalViews, fetchUniqueVisitors } from "@/lib/stats";

type LiveStatsState = {
  totalViews: number | null;
  uniqueVisitors: number | null;
  loading: boolean;
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function fallbackTotals() {
  if (typeof localStorage === "undefined") {
    return { totalViews: 0, uniqueVisitors: 0 };
  }
  const rawTotal = Number(localStorage.getItem("fallback-total") ?? "0");
  const nextTotal = Number.isFinite(rawTotal) ? rawTotal + 1 : 1;
  localStorage.setItem("fallback-total", String(nextTotal));

  const today = getTodayKey();
  const seenKey = "fallback-unique-date";
  const rawUnique = Number(localStorage.getItem("fallback-unique") ?? "0");
  let nextUnique = Number.isFinite(rawUnique) ? rawUnique : 0;
  if (localStorage.getItem(seenKey) !== today) {
    nextUnique += 1;
    localStorage.setItem("fallback-unique", String(nextUnique));
    localStorage.setItem(seenKey, today);
  }
  return { totalViews: nextTotal, uniqueVisitors: nextUnique };
}

export function useLiveStats() {
  const [state, setState] = useState<LiveStatsState>({
    totalViews: null,
    uniqueVisitors: null,
    loading: true
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const [total, unique] = await Promise.all([fetchTotalViews(), fetchUniqueVisitors()]);
        if (!cancelled) {
          setState({ totalViews: total, uniqueVisitors: unique, loading: false });
        }
        return true;
      } catch {
        return false;
      }
    };

    const load = async () => {
      const ok = await run();
      if (ok || cancelled) {
        return;
      }
      window.setTimeout(async () => {
        if (cancelled) {
          return;
        }
        const retryOk = await run();
        if (!retryOk && !cancelled) {
          const fallback = fallbackTotals();
          setState({ totalViews: fallback.totalViews, uniqueVisitors: fallback.uniqueVisitors, loading: false });
        }
      }, 1000);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
