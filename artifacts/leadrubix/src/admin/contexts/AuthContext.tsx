import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { adminApi, type AdminUser } from "../lib/api";

type AuthState = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string, totpCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await adminApi.me();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function login(email: string, password: string, totpCode?: string) {
    const res = await adminApi.login(email, password, totpCode);
    setUser(res.user);
  }

  async function logout() {
    try {
      await adminApi.logout();
    } finally {
      setUser(null);
    }
  }

  async function changePassword(current: string, next: string) {
    await adminApi.changePassword(current, next);
    // Refresh self so mustChangePassword flips off in context.
    await refresh();
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
