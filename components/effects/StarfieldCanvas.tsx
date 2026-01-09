"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
};

type StarfieldCanvasProps = {
  enabled: boolean;
  brightnessBoost?: number;
};

export default function StarfieldCanvas({ enabled, brightnessBoost = 1 }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduceMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let animationId = 0;

    const createStars = () => {
      const count = Math.min(160, Math.floor((width * height) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.35 + 0.05,
        alpha: Math.random() * 0.6 + 0.2
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      createStars();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        ctx.beginPath();
        const alpha = Math.min(1, star.alpha * brightnessBoost);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      animationId = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [enabled, reduceMotion, brightnessBoost]);

  if (!enabled || reduceMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
