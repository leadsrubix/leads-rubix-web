import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import AdminLayout from "./AdminLayout";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) return null;
  return <AdminLayout>{children}</AdminLayout>;
}
