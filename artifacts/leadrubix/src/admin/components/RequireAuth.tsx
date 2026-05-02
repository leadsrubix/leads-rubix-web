import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import AdminLayout from "./AdminLayout";

export default function RequireAuth({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  const { user, loading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/admin/login", { replace: true });
      return;
    }
    if (
      user.mustChangePassword &&
      !location.startsWith("/admin/change-password")
    ) {
      navigate("/admin/change-password", { replace: true });
    }
  }, [loading, user, location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!user) return null;
  if (user.mustChangePassword && !location.startsWith("/admin/change-password")) {
    return null;
  }
  if (bare) return <>{children}</>;
  return <AdminLayout>{children}</AdminLayout>;
}
