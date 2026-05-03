import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldAlert, Copy, Check } from "lucide-react";
import { adminApi } from "../lib/api";

interface SetupBundle {
  secret: string;
  otpauth: string;
  qrDataUrl: string;
  recoveryCodes: string[];
}

export default function AdminSecurity() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [setup, setSetup] = useState<SetupBundle | null>(null);
  const [confirmCode, setConfirmCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void adminApi.totpStatus().then((r) => setEnabled(r.enabled)).catch(() => setEnabled(false));
  }, []);

  async function startSetup() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await adminApi.totpSetup();
      setSetup({
        secret: r.secret,
        otpauth: r.otpauth,
        qrDataUrl: r.qrDataUrl,
        recoveryCodes: r.recoveryCodes,
      });
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Could not start setup" });
    } finally {
      setBusy(false);
    }
  }

  async function confirmEnable() {
    setBusy(true);
    setMsg(null);
    try {
      await adminApi.totpEnable(confirmCode.trim());
      setEnabled(true);
      setMsg({ kind: "ok", text: "Two-factor authentication is now enabled." });
      setSetup(null);
      setConfirmCode("");
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Could not enable 2FA" });
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    if (!disablePassword) return;
    setBusy(true);
    setMsg(null);
    try {
      await adminApi.totpDisable(disablePassword);
      setEnabled(false);
      setDisablePassword("");
      setMsg({ kind: "ok", text: "Two-factor authentication has been turned off." });
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Could not disable 2FA" });
    } finally {
      setBusy(false);
    }
  }

  function copyCodes() {
    if (!setup) return;
    void navigator.clipboard.writeText(setup.recoveryCodes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-semibold">Account security</h1>
          <p className="text-sm text-muted-foreground">
            Add a second factor to your sign-in. We support any TOTP authenticator (Google Authenticator,
            1Password, Authy, Microsoft Authenticator).
          </p>
        </div>

        {msg ? (
          <div
            className={`text-sm rounded-md px-3 py-2 border ${
              msg.kind === "ok"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
            data-testid="text-security-msg"
          >
            {msg.text}
          </div>
        ) : null}

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            {enabled ? (
              <ShieldCheck className="size-5 text-emerald-600" />
            ) : (
              <ShieldAlert className="size-5 text-amber-600" />
            )}
            <CardTitle>
              Two-factor authentication —{" "}
              <span className={enabled ? "text-emerald-700" : "text-amber-700"}>
                {enabled === null ? "…" : enabled ? "ON" : "OFF"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {enabled === false && !setup ? (
              <Button onClick={startSetup} disabled={busy} data-testid="btn-totp-start">
                Enable two-factor authentication
              </Button>
            ) : null}

            {setup ? (
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">1. Scan this QR with your authenticator</p>
                  <img
                    src={setup.qrDataUrl}
                    alt="TOTP QR code"
                    width={200}
                    height={200}
                    className="border rounded"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Or paste this secret manually: <code className="font-mono">{setup.secret}</code>
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-2">2. Save your recovery codes</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Store these somewhere safe — each code works once if you lose your authenticator.
                    They will not be shown again.
                  </p>
                  <div className="bg-slate-50 border rounded p-3 grid grid-cols-2 gap-1 font-mono text-sm">
                    {setup.recoveryCodes.map((c) => (
                      <div key={c} data-testid="text-recovery-code">{c}</div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCodes}
                    className="mt-2 gap-2"
                    data-testid="btn-copy-recovery"
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy all codes"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmCode">3. Enter a code from the app to confirm</Label>
                  <div className="flex gap-2">
                    <Input
                      id="confirmCode"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={8}
                      value={confirmCode}
                      onChange={(e) => setConfirmCode(e.target.value)}
                      placeholder="123456"
                      data-testid="input-totp-confirm"
                    />
                    <Button onClick={confirmEnable} disabled={busy || confirmCode.length < 6} data-testid="btn-totp-confirm">
                      Confirm & enable
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}

            {enabled ? (
              <div className="border-t pt-5 space-y-3">
                <p className="text-sm text-muted-foreground">
                  To turn 2FA off, re-enter your password.
                </p>
                <div className="flex gap-2 max-w-sm">
                  <Input
                    type="password"
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                    placeholder="Current password"
                    data-testid="input-totp-disable-password"
                  />
                  <Button
                    variant="outline"
                    onClick={disable}
                    disabled={busy || !disablePassword}
                    data-testid="btn-totp-disable"
                  >
                    Disable
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
