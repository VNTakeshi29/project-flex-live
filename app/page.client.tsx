"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Fragments from "@/components/Fragments";
import StarfieldCanvas from "@/components/effects/StarfieldCanvas";
import GrainOverlay from "@/components/effects/GrainOverlay";
import CursorSpotlight from "@/components/effects/CursorSpotlight";
import ClientOnly from "@/components/effects/ClientOnly";
import RainVideoOverlay from "@/components/effects/RainVideoOverlay";
import Toaster from "@/components/ui/Toaster";
import HiddenMessage from "@/components/ui/HiddenMessage";
import ContextMessage from "@/components/ui/ContextMessage";
import { useKeySequence } from "@/lib/hooks/useKeySequence";
import { useScrollDepth } from "@/lib/hooks/useScrollDepth";
import { useIdle } from "@/lib/hooks/useIdle";
import { useTimeMood } from "@/lib/hooks/useTimeMood";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import { useToast } from "@/lib/hooks/useToast";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [theme, setTheme] = useLocalStorageState<"dark" | "light">("theme", "dark");
  const [musicEnabled, setMusicEnabled] = useLocalStorageState("music", false);
  const [neonMode, setNeonMode] = useState(false);
  const neonTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const hoverBoostRef = useRef<number>(0);
  const idleBoostRef = useRef<number>(0);
  const presenceBoostRef = useRef<number>(0);
  const { toasts, push } = useToast();
  const reduceMotion = useReducedMotion();
  const [contextMessage, setContextMessage] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const idle = useIdle({ timeoutMs: 20000 });
  const mood = useTimeMood();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
    }
  }, []);

  useEffect(() => {
    try {
      const visited = localStorage.getItem("visited-before") === "true";
      if (!visited) {
        localStorage.setItem("visited-before", "true");
        return;
      }
      if (sessionStorage.getItem("welcome-back-shown") === "true") {
        return;
      }
      sessionStorage.setItem("welcome-back-shown", "true");
      setWelcomeMessage("Welcome back.");
      window.setTimeout(() => setWelcomeMessage(null), 4200);
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      const storedMusic = localStorage.getItem("music");
      const storedAmbient = localStorage.getItem("ambient");
      if (storedMusic === null && storedAmbient === "true") {
        setMusicEnabled(true);
        localStorage.setItem("music", "true");
      }
    } catch {
      // Ignore migration errors
    }
  }, [setMusicEnabled]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("neon-mode", neonMode);
  }, [neonMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("mood-late-night", "mood-morning", "mood-night");
    if (mood === "late-night") {
      root.classList.add("mood-late-night");
    } else if (mood === "morning") {
      root.classList.add("mood-morning");
    } else if (mood === "night") {
      root.classList.add("mood-night");
    }
  }, [mood]);

  useEffect(() => {
    return () => {
      if (neonTimeoutRef.current) {
        window.clearTimeout(neonTimeoutRef.current);
      }
    };
  }, []);

  useKeySequence(["T", "A", "K", "E", "S", "H", "I"], () => {
    setNeonMode(true);
    push("Neon pulse.");
    if (neonTimeoutRef.current) {
      window.clearTimeout(neonTimeoutRef.current);
    }
    neonTimeoutRef.current = window.setTimeout(() => {
      setNeonMode(false);
    }, 6000);
  });

  useScrollDepth({
    onSeventy: () => {
      setContextMessage("You're almost at the end.");
      window.setTimeout(() => setContextMessage(null), 4200);
    },
    onBottom: () => {
      setContextMessage("That's everything. For now.");
      window.setTimeout(() => setContextMessage(null), 4200);
    }
  });

  const fadeVolume = useCallback((audio: HTMLAudioElement, target: number, duration: number) => {
    if (fadeRef.current) {
      window.cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
    const start = performance.now();
    const from = audio.volume;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const v = from + (target - from) * progress;
      audio.volume = Math.max(0, Math.min(1, v));
      if (progress < 1) {
        fadeRef.current = window.requestAnimationFrame(step);
      } else {
        audio.volume = Math.max(0, Math.min(1, target));
        fadeRef.current = null;
      }
    };
    fadeRef.current = window.requestAnimationFrame(step);
  }, []);

  const getTargetVolume = useCallback(() => {
    return Math.max(
      0,
      Math.min(1, 0.45 + hoverBoostRef.current + idleBoostRef.current + presenceBoostRef.current)
    );
  }, []);

  const handleMusicToggle = useCallback(() => {
    const nextValue = !musicEnabled;
    setMusicEnabled(nextValue);
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (nextValue) {
      audio.volume = 0;
      const playAttempt = audio.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          setMusicEnabled(false);
          push("Music blocked");
        });
      }
      fadeVolume(audio, getTargetVolume(), 800);
    } else {
      fadeVolume(audio, 0, 500);
      window.setTimeout(() => {
        audio.pause();
      }, 500);
    }
  }, [fadeVolume, getTargetVolume, musicEnabled, push, setMusicEnabled]);

  const handleHeroMediaHover = useCallback(
    (active: boolean) => {
      if (!musicEnabled) {
        return;
      }
      hoverBoostRef.current = active ? 0.05 : 0;
      const audio = audioRef.current;
      if (!audio) {
        return;
      }
      const target = getTargetVolume();
      fadeVolume(audio, target, 300);
    },
    [fadeVolume, getTargetVolume, musicEnabled]
  );

  useEffect(() => {
    if (!musicEnabled) {
      return;
    }
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (idle) {
      idleBoostRef.current = -0.08;
      setContextMessage("Still here?");
    } else {
      idleBoostRef.current = 0;
      setContextMessage(null);
    }
    const target = getTargetVolume();
    fadeVolume(audio, target, 300);
  }, [fadeVolume, getTargetVolume, idle, musicEnabled]);

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      const hidden = document.hidden;
      setIsHidden(hidden);
      if (document.hidden) {
        presenceBoostRef.current = -0.12;
      } else {
        presenceBoostRef.current = 0;
      }
      if (audio && musicEnabled) {
        const target = getTargetVolume();
        fadeVolume(audio, target, 300);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [fadeVolume, getTargetVolume, musicEnabled]);

  const handleCopyContact = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        push(`Copied: ${value}`);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        push(`Copied: ${value}`);
      }
    },
    [push]
  );

  return (
    <div className={cn("relative min-h-screen overflow-x-hidden")}>
      <div className="gradient-drift animate-drift fixed inset-0 -z-30" aria-hidden="true" />
      <ClientOnly>
        <StarfieldCanvas enabled brightnessBoost={neonMode ? (reduceMotion ? 1.1 : 1.35) : 1} />
      </ClientOnly>
      <ClientOnly>
        <GrainOverlay />
      </ClientOnly>
      <ClientOnly>
        <CursorSpotlight enabled />
      </ClientOnly>
      {musicEnabled ? (
        <ClientOnly>
          <RainVideoOverlay boosted={hoverBoostRef.current > 0} dimmed={idle || isHidden} />
        </ClientOnly>
      ) : null}

      <main className="relative z-10">
        <Hero
          theme={theme}
          onThemeChange={setTheme}
          musicEnabled={musicEnabled}
          onMusicToggle={handleMusicToggle}
          onCopyContact={handleCopyContact}
          onHeroMediaHover={reduceMotion ? undefined : handleHeroMediaHover}
        />
        <Projects />
        <Timeline />
        <Fragments />
      </main>
      <Footer />
      <Toaster toasts={toasts} />
      <HiddenMessage />
      <ContextMessage message={contextMessage} position="center" />
      <ContextMessage message={welcomeMessage} position="left" />
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
}
