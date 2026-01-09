"use client";

import { useEffect, useRef, useState } from "react";

type Options<T> = {
  parse?: (value: string) => T;
  serialize?: (value: T) => string;
};

export function useLocalStorageState<T>(key: string, defaultValue: T, options: Options<T> = {}) {
  const { parse, serialize } = options;
  const [value, setValue] = useState<T>(defaultValue);
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const parsed = parse
          ? parse(stored)
          : (() => {
              try {
                return JSON.parse(stored) as T;
              } catch {
                return stored as unknown as T;
              }
            })();
        setValue(parsed);
      }
    } catch {
      setValue(defaultValue);
    } finally {
      hydratedRef.current = true;
    }
  }, [key, defaultValue, parse]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }
    try {
      const raw = serialize ? serialize(value) : JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch {
      // Ignore write errors
    }
  }, [key, serialize, value]);

  return [value, setValue] as const;
}
