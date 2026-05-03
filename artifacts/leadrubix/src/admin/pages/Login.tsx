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
  const [totpCode, setTotpCode] = useState("");
  const [requiresTotp, setRequiresTotp] = useState(false);
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
      await login(email, password, requiresTotp ? totpCode : undefined);
    } catch (err) {
      const e = err as Error & { requiresTotp?: boolean };
      const msg = e.message ?? "Sign-in failed";
      // Server tells us explicitly when password was OK but a 2FA code is
      // needed (or wrong) via the structured `requiresTotp` flag on the
      // error body, surfaced by api.ts.
      if (e.requiresTotp) {
        const wasFirstStep = !requiresTotp;
        setRequiresTotp(true);
        // On first transition into the 2FA step, suppress the "missing code"
        // message — the heading already explains what to do.
        setError(wasFirstStep ? null : msg);
      } else {
        setError(msg);
      }
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
            {requiresTotp
              ? "Enter the 6-digit code from your authenticator app to finish signing in."
              : "Sign in to manage your site, leads and content."}
          </p>
        </div>
        {!requiresTotp ? (
          <>
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
          </>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="totp">Authenticator code</Label>
            <Input
              id="totp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9 a-fA-F-]*"
              maxLength={20}
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              autoFocus
              required
              placeholder="123 456"
              data-testid="input-admin-totp"
            />
            <p className="text-xs text-muted-foreground">
              Lost your device? Use a recovery code (format: <code>abcde-12345</code>).
            </p>
            <button
              type="button"
              onClick={() => {
                setRequiresTotp(false);
                setTotpCode("");
                setError(null);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline"
            >
              ← Use a different account
            </button>
          </div>
        )}
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
          {submitting
            ? "Signing in…"
            : requiresTotp
              ? "Verify & continue"
              : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
