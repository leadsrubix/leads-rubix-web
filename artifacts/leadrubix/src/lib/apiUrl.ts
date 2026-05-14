// Public-site API URL helper. Mirrors src/admin/lib/api.ts so the marketing
// site can talk to the API server when it lives on a different subdomain
// (e.g. https://api.leadsrubix.com on Hostinger, where the static SPA host
// has no Node runtime to proxy /api/*).
//
// Local dev: leave VITE_API_BASE_URL empty so calls stay same-origin and
// flow through the workspace shared proxy.
// Production: defaults to https://api.leadsrubix.com.

export const API_BASE_URL: string =
  ((import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_API_BASE_URL as string | undefined) ?? "https://api.leadsrubix.com";

const TRIMMED = API_BASE_URL.replace(/\/$/, "");

/** Returns an absolute URL for a path that begins with `/api/...`. */
export function apiUrl(pathStartingWithApi: string): string {
  if (!TRIMMED) return pathStartingWithApi;
  // path starts with "/api/..." — strip the leading "/api" because TRIMMED
  // already represents the API root that owns "/api".
  const p = pathStartingWithApi.startsWith("/api")
    ? pathStartingWithApi.slice(4)
    : pathStartingWithApi;
  return `${TRIMMED}/api${p.startsWith("/") ? p : `/${p}`}`;
}

/** Same fetch options we use everywhere — credentials included for cross-origin
 *  cookie auth, JSON content-type when there is a body. */
export function apiFetch(
  pathStartingWithApi: string,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(apiUrl(pathStartingWithApi), {
    credentials: TRIMMED ? "include" : "same-origin",
    ...init,
  });
}
