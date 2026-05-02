export type ApiResult<T> = { ok: true } & T;
export type ApiError = { ok: false; error: string };

const BASE = "/api";

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
    const error = (data as ApiError)?.error ?? `Request failed (${res.status})`;
    const err = new Error(error) as Error & { status: number };
    err.status = res.status;
    throw err;
  }
  return data as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    api<{ ok: true; user: AdminUser }>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => api<{ ok: true }>("/admin/auth/logout", { method: "POST" }),
  me: () => api<{ ok: true; user: AdminUser }>("/admin/auth/me"),

  analytics: () => api<AnalyticsResponse>("/admin/analytics"),

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
  updateLead: (id: string, patch: { status?: string; notes?: string }) =>
    api<{ ok: true; lead: Lead }>(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteLead: (id: string) =>
    api<{ ok: true }>(`/admin/leads/${id}`, { method: "DELETE" }),

  listContent: () => api<{ ok: true; sections: ContentSection[] }>(`/admin/content`),
  getContent: (key: string) =>
    api<{ ok: true; section: ContentSection }>(`/admin/content/${encodeURIComponent(key)}`),
  putContent: (key: string, value: unknown) =>
    api<{ ok: true; section: ContentSection }>(`/admin/content/${encodeURIComponent(key)}`, {
      method: "PUT",
      body: JSON.stringify({ value }),
    }),

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
  updateUser: (id: string, patch: { name?: string; role?: string; password?: string }) =>
    api<{ ok: true; user: AdminUser }>(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteUser: (id: string) =>
    api<{ ok: true }>(`/admin/users/${id}`, { method: "DELETE" }),
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
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
  messageLength: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContentSection {
  key: string;
  value: unknown;
  updatedAt: string;
  updatedBy: string | null;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
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
  status: "draft" | "published";
}

export interface AnalyticsResponse {
  ok: true;
  totals: {
    total: number;
    newCount: number;
    contactedCount: number;
    qualifiedCount: number;
    wonCount: number;
    lostCount: number;
    last7d: number;
    last30d: number;
  };
  bySource: { source: string; count: number }[];
  trend: { day: string; count: number }[];
  topCompanies: { company: string; count: number }[];
}
