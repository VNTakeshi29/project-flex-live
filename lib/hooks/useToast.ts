"use client";

import { useEffect, useRef, useState } from "react";

export type ToastItem = {
  id: number;
  message: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Map<number, number>>(new Map());
  const idRef = useRef(0);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutsRef.current.clear();
    };
  }, []);

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  };

  const push = (message: string, duration = 1600) => {
    const id = idRef.current + 1;
    idRef.current = id;
    setToasts((prev) => [...prev, { id, message }]);
    const timeoutId = window.setTimeout(() => remove(id), duration);
    timeoutsRef.current.set(id, timeoutId);
  };

  return { toasts, push, remove };
}
