import { useEffect, useState } from "react";

const cache = new Map<string, unknown>();

/**
 * Read a CMS-driven content section by key, returning a fallback default while
 * it loads (or if the request fails). Cached in a module-scope Map so each key
 * is only fetched once per page load.
 */
export function useContent<T>(key: string, defaultValue: T): T {
  return useContentWithStatus(key, defaultValue).value;
}

/**
 * Same as `useContent`, but also exposes a `loading` flag — useful when you
 * want to show a skeleton placeholder instead of the default fallback to
 * avoid the brief flash of "default" content before the CMS value arrives.
 */
export function useContentWithStatus<T>(
  key: string,
  defaultValue: T,
): { value: T; loading: boolean } {
  const cached = cache.get(key) as T | undefined;
  const [value, setValue] = useState<T>(cached ?? defaultValue);
  const [loading, setLoading] = useState<boolean>(!cache.has(key));

  useEffect(() => {
    let active = true;
    if (cache.has(key)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/content/${encodeURIComponent(key)}`, { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!active) return;
        if (d?.ok) {
          cache.set(key, d.value);
          setValue(d.value as T);
        }
      })
      .catch(() => {
        // ignore — fall back to default
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [key]);

  return { value, loading };
}
