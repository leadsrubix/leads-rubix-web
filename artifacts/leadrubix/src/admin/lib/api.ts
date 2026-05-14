export type ApiResult<T> = { ok: true } & T;
export type ApiError = { ok: false; error: string; code?: string };

// Production: API lives on https://api.leadsrubix.com (separate subdomain on
// Hostinger Shared via .htaccess proxy). Local dev: leave VITE_API_BASE_URL
// empty in `.env.development` to use the same-origin /api path through the
// shared proxy. Set to a full URL like "https://api.leadsrubix.com" in
// `.env.production` to call the production API directly.
export const API_BASE_URL: string =
  ((import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_API_BASE_URL as string | undefined) ?? "https://api.leadsrubix.com";

const BASE = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/api` : "/api";

export async function api<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    ...init,
  });
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Request failed (${res.status})`);
  }
  if (!res.ok) {
    const body = data as ApiError & { requiresTotp?: boolean };
    const error = body?.error ?? `Request failed (${res.status})`;
    const err = new Error(error) as Error & {
      status: number;
      code?: string;
      requiresTotp?: boolean;
    };
    err.status = res.status;
    err.code = body?.code;
    err.requiresTotp = body?.requiresTotp === true;
    // Force-change-password interceptor — redirect anywhere except the change page itself.
    if (
      res.status === 409 &&
      body?.code === "MUST_CHANGE_PASSWORD" &&
      typeof window !== "undefined" &&
      !window.location.pathname.endsWith("/admin/change-password")
    ) {
      window.location.assign("/admin/change-password");
    }
    throw err;
  }
  return data as T;
}

export const adminApi = {
  login: (email: string, password: string, totpCode?: string) =>
    api<{ ok: true; user: AdminUser }>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(totpCode ? { email, password, totpCode } : { email, password }),
    }),
  totpStatus: () => api<{ ok: true; enabled: boolean }>("/admin/totp/status"),
  totpSetup: () =>
    api<{
      ok: true;
      secret: string;
      otpauth: string;
      qrDataUrl: string;
      recoveryCodes: string[];
    }>("/admin/totp/setup", { method: "POST" }),
  totpEnable: (code: string) =>
    api<{ ok: true; alreadyEnabled?: boolean }>("/admin/totp/enable", {
      method: "POST",
      body: JSON.stringify({ code }),
    }),
  totpDisable: (password: string) =>
    api<{ ok: true }>("/admin/totp/disable", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  logout: () => api<{ ok: true }>("/admin/auth/logout", { method: "POST" }),
  me: () => api<{ ok: true; user: AdminUser }>("/admin/auth/me"),
  changePassword: (currentPassword: string, newPassword: string) =>
    api<{ ok: true }>("/admin/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  analytics: (params: { source?: string; days?: number } = {}) => {
    const q = new URLSearchParams();
    if (params.source) q.set("source", params.source);
    if (params.days) q.set("days", String(params.days));
    const suffix = q.toString();
    return api<AnalyticsResponse>(`/admin/analytics${suffix ? `?${suffix}` : ""}`);
  },

  listLeads: (params: Record<string, string | number | undefined>) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") q.set(k, String(v));
    });
    return api<{ ok: true; total: number; page: number; pageSize: number; rows: Lead[] }>(
      `/admin/leads?${q.toString()}`,
    );
  },
  getLead: (id: string) => api<{ ok: true; lead: Lead }>(`/admin/leads/${id}`),
  getLeadActivities: (id: string) =>
    api<{ ok: true; activities: LeadActivity[] }>(`/admin/leads/${id}/activities`),
  updateLead: (
    id: string,
    patch: {
      status?: string;
      notes?: string | null;
      assignedTo?: string | null;
      tags?: string[];
    },
  ) =>
    api<{ ok: true; lead: Lead }>(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteLead: (id: string) =>
    api<{ ok: true }>(`/admin/leads/${id}`, { method: "DELETE" }),
  bulkLeads: (input: {
    ids: string[];
    action: "status" | "assign" | "delete" | "tag_add" | "tag_remove";
    status?: string;
    assignedTo?: string | null;
    tag?: string;
  }) =>
    api<{ ok: true; count: number }>(`/admin/leads/bulk`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  listContent: () => api<{ ok: true; sections: ContentSection[] }>(`/admin/content`),
  getContent: (key: string) =>
    api<{ ok: true; section: ContentSection }>(`/admin/content/${encodeURIComponent(key)}`),
  putContent: (key: string, value: unknown) =>
    api<{ ok: true; section: ContentSection }>(`/admin/content/${encodeURIComponent(key)}`, {
      method: "PUT",
      body: JSON.stringify({ value }),
    }),
  getContentHistory: (key: string) =>
    api<{ ok: true; versions: ContentVersion[] }>(
      `/admin/content/${encodeURIComponent(key)}/history`,
    ),
  restoreContent: (key: string, versionId: string) =>
    api<{ ok: true; section: ContentSection }>(
      `/admin/content/${encodeURIComponent(key)}/restore`,
      { method: "POST", body: JSON.stringify({ versionId }) },
    ),

  listPosts: () => api<{ ok: true; posts: Post[] }>(`/admin/posts`),
  getPost: (id: string) => api<{ ok: true; post: Post }>(`/admin/posts/${id}`),
  createPost: (post: PostInput) =>
    api<{ ok: true; post: Post }>(`/admin/posts`, {
      method: "POST",
      body: JSON.stringify(post),
    }),
  updatePost: (id: string, patch: Partial<PostInput>) =>
    api<{ ok: true; post: Post }>(`/admin/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deletePost: (id: string) =>
    api<{ ok: true }>(`/admin/posts/${id}`, { method: "DELETE" }),

  listUsers: () => api<{ ok: true; users: AdminUser[] }>(`/admin/users`),
  createUser: (input: { email: string; name: string; role: string; password: string }) =>
    api<{ ok: true; user: AdminUser }>(`/admin/users`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updateUser: (
    id: string,
    patch: { name?: string; role?: string; password?: string; mustChangePassword?: boolean },
  ) =>
    api<{ ok: true; user: AdminUser }>(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteUser: (id: string) =>
    api<{ ok: true }>(`/admin/users/${id}`, { method: "DELETE" }),

  listAudit: (params: Record<string, string | number | undefined> = {}) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") q.set(k, String(v));
    });
    return api<{
      ok: true;
      total: number;
      page: number;
      pageSize: number;
      rows: AuditEvent[];
    }>(`/admin/audit?${q.toString()}`);
  },

  requestUpload: (meta: { name: string; size: number; contentType: string }) =>
    api<{ ok: true; uploadURL: string; objectPath: string; url: string }>(
      "/admin/uploads",
      { method: "POST", body: JSON.stringify(meta) },
    ),

  // Upload helper: tries the Replit object-storage presigned-URL flow first
  // (works in dev / on Replit). On any failure (e.g. Hostinger production
  // where the sidecar doesn't exist) falls back to the direct multipart-style
  // endpoint that writes to the api-server's local disk and serves the file
  // back via GET /api/local-uploads/:filename. Returned URL is always a path
  // suitable for storing in posts.coverImage / brand_identity.logoImageUrl.
  uploadFile: async (file: File): Promise<string> => {
    try {
      const { uploadURL, objectPath } = await adminApi.requestUpload({
        name: file.name,
        size: file.size,
        contentType: file.type || "application/octet-stream",
      });
      const put = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      if (!put.ok) throw new Error(`Upload failed (${put.status})`);
      return `/api${objectPath}`;
    } catch (presignErr) {
      // Fallback: direct upload to the api-server's local-disk store.
      const directUrl = `${BASE}/admin/uploads/direct`;
      const direct = await fetch(directUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          "X-Filename": encodeURIComponent(file.name).slice(0, 200),
        },
        body: file,
      });
      if (!direct.ok) {
        const body = await direct.json().catch(() => ({})) as { error?: string };
        const presignMsg = presignErr instanceof Error ? presignErr.message : String(presignErr);
        throw new Error(
          body?.error ?? `Upload failed (${direct.status}; presign also failed: ${presignMsg})`,
        );
      }
      const payload = (await direct.json()) as { url: string };
      return payload.url;
    }
  },
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword?: boolean;
  lastPasswordChangeAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  source: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string | null;
  message: string;
  ipHash: string | null;
  status: string;
  notes: string | null;
  assignedTo: string | null;
  tags: string[] | null;
  lastActivityAt: string | null;
  messageLength: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  actorId: string | null;
  actorName: string | null;
  actorEmail: string | null;
  kind: string;
  payload: Record<string, unknown> | null;
  createdAt: string;
}

export interface ContentSection {
  key: string;
  value: unknown;
  updatedAt: string;
  updatedBy: string | null;
}

export interface ContentVersion {
  id: string;
  key: string;
  value: unknown;
  savedBy: string | null;
  savedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  tags: string[] | null;
  status: "draft" | "published";
  publishedAt: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostInput {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  tags?: string[];
  status: "draft" | "published";
  /** ISO-8601 timestamp. Use a future time to schedule, omit to publish now. */
  publishedAt?: string | null;
}

export interface AuditEvent {
  id: string;
  actorId: string | null;
  actorName: string | null;
  actorEmail: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  payload: Record<string, unknown> | null;
  createdAt: string;
}

export interface AnalyticsResponse {
  ok: true;
  days: number;
  source: string | null;
  totals: {
    total: number;
    newCount: number;
    contactedCount: number;
    qualifiedCount: number;
    wonCount: number;
    lostCount: number;
    spamCount?: number;
    last7d: number;
    last30d: number;
  };
  bySource: { source: string; count: number }[];
  trend: { day: string; count: number }[];
  topCompanies: { company: string; count: number }[];
  funnel: { new: number; contacted: number; qualified: number; won: number };
  periodCompare: { current: number; previous: number };
}
