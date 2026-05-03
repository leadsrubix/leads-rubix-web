const STORAGE_KEY = "lr_ab_assignments_v1";

type Assignments = Record<string, string>;

function readAssignments(): Assignments {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Assignments) : {};
  } catch {
    return {};
  }
}

function writeAssignments(a: Assignments) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* noop */
  }
}

/**
 * Deterministic per-session A/B variant picker. Same experiment key returns the
 * same variant for the life of the session. Reports the assignment to GA4 via
 * dataLayer the first time we pick.
 */
export function getVariant<T extends string>(experiment: string, variants: readonly T[]): T {
  if (variants.length === 0) throw new Error("getVariant: variants required");
  const cur = readAssignments();
  const existing = cur[experiment];
  if (existing && (variants as readonly string[]).includes(existing)) {
    return existing as T;
  }
  const pick = variants[Math.floor(Math.random() * variants.length)]!;
  cur[experiment] = pick;
  writeAssignments(cur);
  if (typeof window !== "undefined") {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "ab_assignment", ab_experiment: experiment, ab_variant: pick });
  }
  return pick;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
}
