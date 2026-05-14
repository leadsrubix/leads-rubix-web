import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { apiFetch } from "@/lib/apiUrl";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertOctagon, Activity } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";

type Severity = "operational" | "degraded" | "outage";

interface Incident {
  date: string;
  service?: string;
  severity?: Severity;
  title: string;
  body?: string;
}

interface ServiceState {
  name: string;
  status?: Severity;
}

interface StatusContent {
  summary?: string;
  services?: ServiceState[];
  incidents?: Incident[];
}

const DEFAULT_STATUS: StatusContent = {
  summary: "All systems operational.",
  services: [
    { name: "Marketing site", status: "operational" },
    { name: "Admin panel", status: "operational" },
    { name: "Public API", status: "operational" },
    { name: "Lead intake", status: "operational" },
    { name: "Object storage (uploads)", status: "operational" },
  ],
  incidents: [],
};

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function buildLast90(): Date[] {
  const today = startOfUtcDay(new Date());
  const days: Date[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    days.push(d);
  }
  return days;
}

function severityForDay(day: Date, incidents: Incident[], serviceName?: string): Severity {
  const ymd = day.toISOString().slice(0, 10);
  let worst: Severity = "operational";
  for (const inc of incidents) {
    if ((inc.date ?? "").slice(0, 10) !== ymd) continue;
    if (serviceName && inc.service && inc.service !== serviceName) continue;
    const sev = inc.severity ?? "degraded";
    if (sev === "outage") return "outage";
    if (sev === "degraded") worst = "degraded";
  }
  return worst;
}

const SEVERITY_CLASS: Record<Severity, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-rose-600",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

const SEVERITY_ICON: Record<Severity, typeof CheckCircle2> = {
  operational: CheckCircle2,
  degraded: AlertTriangle,
  outage: AlertOctagon,
};

export default function StatusPage() {
  const data = useContent<StatusContent>("status_page", DEFAULT_STATUS);
  const services = data.services ?? DEFAULT_STATUS.services!;
  const incidents = data.incidents ?? [];
  const days = buildLast90();
  const overall: Severity = incidents.some((i) => i.severity === "outage")
    ? "outage"
    : incidents.length > 0
      ? "degraded"
      : "operational";
  const OverallIcon = SEVERITY_ICON[overall];

  useSEO({
    title: "Status — Leads Rubix | Live system uptime",
    description:
      "Live operational status and last-90-days uptime for the Leads Rubix marketing site, admin panel, public API and lead intake.",
    canonical: "https://leadsrubix.com/status",
  });

  const [livePing, setLivePing] = useState<{ status: "checking" | "ok" | "fail"; ms?: number }>({
    status: "checking",
  });
  useEffect(() => {
    let cancelled = false;
    const t0 = performance.now();
    const ctrl = new AbortController();
    const timeout = window.setTimeout(() => ctrl.abort(), 5000);
    apiFetch("/api/healthz", { signal: ctrl.signal, cache: "no-store" })
      .then((r) => {
        if (cancelled) return;
        const ms = Math.max(0, Math.round(performance.now() - t0));
        setLivePing({ status: r.ok ? "ok" : "fail", ms });
      })
      .catch(() => {
        if (!cancelled) setLivePing({ status: "fail" });
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      cancelled = true;
      ctrl.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  const uptime = (() => {
    let bad = 0;
    for (const d of days) {
      if (severityForDay(d, incidents) !== "operational") bad++;
    }
    return (((days.length - bad) / days.length) * 100).toFixed(2);
  })();

  function uptimeFor(serviceName: string): string {
    let bad = 0;
    for (const d of days) {
      if (severityForDay(d, incidents, serviceName) !== "operational") bad++;
    }
    return (((days.length - bad) / days.length) * 100).toFixed(2);
  }

  return (
    <Layout>
      <section className="py-16 md:py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${overall === "operational" ? "bg-emerald-100 text-emerald-800" : overall === "degraded" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"}`} data-testid="status-pill">
            <OverallIcon className="h-4 w-4" />
            {data.summary ?? SEVERITY_LABEL[overall]}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">System status</h1>
          <p className="mt-3 text-muted-foreground">Last 90 days uptime: <span className="font-semibold text-foreground" data-testid="text-uptime">{uptime}%</span></p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium" data-testid="live-ping">
            <Activity
              className={`h-3.5 w-3.5 ${livePing.status === "ok" ? "text-emerald-600 animate-pulse" : livePing.status === "fail" ? "text-rose-600" : "text-muted-foreground"}`}
            />
            <span className="text-muted-foreground">
              Live API ping:{" "}
              <span
                className={
                  livePing.status === "ok"
                    ? "text-emerald-700 font-semibold"
                    : livePing.status === "fail"
                      ? "text-rose-700 font-semibold"
                      : "text-muted-foreground"
                }
              >
                {livePing.status === "checking"
                  ? "checking…"
                  : livePing.status === "ok"
                    ? `OK${livePing.ms !== undefined ? ` · ${livePing.ms}ms` : ""}`
                    : "Unreachable"}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {services.map((s) => {
            const sev = s.status ?? "operational";
            const Icon = SEVERITY_ICON[sev];
            return (
              <Card key={s.name} data-testid={`service-${slugify(s.name)}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">{s.name}</h2>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${sev === "operational" ? "text-emerald-700" : sev === "degraded" ? "text-amber-800" : "text-rose-700"}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {SEVERITY_LABEL[sev]}
                    </span>
                  </div>
                  <div className="flex gap-[2px] items-end" role="img" aria-label={`${s.name} uptime last 90 days`}>
                    {days.map((d, i) => {
                      const sevDay = severityForDay(d, incidents, s.name);
                      return (
                        <div
                          key={i}
                          title={`${d.toISOString().slice(0, 10)} · ${SEVERITY_LABEL[sevDay]}`}
                          className={`h-7 flex-1 min-w-[3px] rounded-sm ${SEVERITY_CLASS[sevDay]}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                    <span>90 days ago</span>
                    <span>{uptimeFor(s.name)}% · Today</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Recent incidents</h2>
          {incidents.length === 0 ? (
            <p className="text-muted-foreground" data-testid="text-no-incidents">No incidents reported in the last 90 days.</p>
          ) : (
            <ul className="space-y-4">
              {incidents.slice(0, 25).map((inc, i) => (
                <li key={i} className="border-l-4 border-amber-500 pl-4 py-2" data-testid={`incident-${i}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{(inc.date ?? "").slice(0, 10)}</span>
                    {inc.service ? <span>· {inc.service}</span> : null}
                    {inc.severity ? <span>· {SEVERITY_LABEL[inc.severity]}</span> : null}
                  </div>
                  <div className="font-medium mt-1">{inc.title}</div>
                  {inc.body ? <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{inc.body}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
