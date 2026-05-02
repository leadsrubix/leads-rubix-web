import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLogin() {
  const { login, user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (user.mustChangePassword) {
        navigate("/admin/change-password", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    }
  }, [loading, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      // navigation is handled by the effect once `user` updates.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border rounded-xl shadow-sm p-6 md:p-8 space-y-5"
      >
        <div>
          <h1 className="text-xl font-semibold">Leads Rubix Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage your site, leads and content.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
            data-testid="input-admin-email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="input-admin-password"
          />
        </div>
        {error ? (
          <div
            className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-md px-3 py-2"
            data-testid="text-admin-login-error"
          >
            {error}
          </div>
        ) : null}
        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
          data-testid="btn-admin-login"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
