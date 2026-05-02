import { useEffect, useState } from "react";

const cache = new Map<string, unknown>();

export function useContent<T>(key: string, defaultValue: T): T {
  const cached = cache.get(key) as T | undefined;
  const [value, setValue] = useState<T>(cached ?? defaultValue);

  useEffect(() => {
    let active = true;
    if (cache.has(key)) return;
    fetch(`/api/content/${encodeURIComponent(key)}`, { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!active || !d?.ok) return;
        cache.set(key, d.value);
        setValue(d.value as T);
      })
      .catch(() => {
        // ignore — fall back to default
      });
    return () => {
      active = false;
    };
  }, [key]);

  return value;
}
