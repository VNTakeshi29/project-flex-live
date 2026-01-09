"use client";

import { useEffect, useState } from "react";

type Mood = "late-night" | "morning" | "night" | "default";

export function useTimeMood() {
  const [mood, setMood] = useState<Mood>("default");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 4) {
      setMood("late-night");
    } else if (hour >= 4 && hour < 9) {
      setMood("morning");
    } else if (hour >= 19 && hour <= 23) {
      setMood("night");
    } else {
      setMood("default");
    }
  }, []);

  return mood;
}
