import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminApi, type AnalyticsResponse } from "../lib/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const SOURCE_CHOICES = ["all", "contact", "demo"];
const DAY_CHOICES = [7, 14, 30, 60, 90];

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState("all");
  const [days, setDays] = useState(30);

  useEffect(() => {
    setData(null);
    setError(null);
    adminApi
      .analytics({ source: source === "all" ? undefined : source, days })
      .then((d) => setData(d))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [source, days]);

  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>;

  const stats = [
    { label: "Total leads", value: data.totals.total, testId: "stat-total" },
    { label: "Last 7 days", value: data.totals.last7d, testId: "stat-7d" },
    { label: "Last 30 days", value: data.totals.last30d, testId: "stat-30d" },
    { label: "Won", value: data.totals.wonCount, testId: "stat-won" },
  ];

  const statusBreakdown = [
    { label: "New", value: data.totals.newCount },
    { label: "Contacted", value: data.totals.contactedCount },
    { label: "Qualified", value: data.totals.qualifiedCount },
    { label: "Won", value: data.totals.wonCount },
    { label: "Lost", value: data.totals.lostCount },
  ];

  const funnelRows = [
    { stage: "All leads", value: data.funnel.new },
    { stage: "Contacted+", value: data.funnel.contacted },
    { stage: "Qualified+", value: data.funnel.qualified },
    { stage: "Won", value: data.funnel.won },
  ];

  const change =
    data.periodCompare.previous === 0
      ? null
      : ((data.periodCompare.current - data.periodCompare.previous) /
          data.periodCompare.previous) *
        100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Lead intake at a glance.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-36" data-testid="select-analytics-source">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_CHOICES.map((s) => (
                <SelectItem key={s} value={s}>
                  Source: {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
            <SelectTrigger className="w-32" data-testid="select-analytics-days">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAY_CHOICES.map((d) => (
                <SelectItem key={d} value={String(d)}>
                  Last {d} days
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild data-testid="btn-view-leads">
            <Link href="/admin/leads">View all leads</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} data-testid={s.testId}>
            <CardContent className="pt-5">
              <div className="text-3xl font-bold tabular-nums">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Period comparison · last {days} vs prior {days} days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold tabular-nums">
                {data.periodCompare.current}
              </div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-500">
                {data.periodCompare.previous}
              </div>
              <div className="text-xs text-muted-foreground">Previous</div>
            </div>
            <div>
              <div
                className={`text-2xl font-bold tabular-nums ${
                  change === null
                    ? "text-slate-500"
                    : change >= 0
                      ? "text-green-700"
                      : "text-red-700"
                }`}
                data-testid="period-change"
              >
                {change === null ? "—" : `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`}
              </div>
              <div className="text-xs text-muted-foreground">Change</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Submissions, last {days} days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickFormatter={(v) => v.slice(5)} fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#0f172a"
                    fill="url(#g1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {statusBreakdown.map((s) => (
                <li key={s.label} className="flex items-center justify-between">
                  <span>{s.label}</span>
                  <span className="font-semibold tabular-nums">{s.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conversion funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={funnelRows} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} fontSize={11} />
                <YAxis type="category" dataKey="stage" fontSize={11} width={90} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By source</CardTitle>
          </CardHeader>
          <CardContent>
            {data.bySource.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {data.bySource.map((s) => (
                  <li key={s.source} className="flex items-center justify-between">
                    <span className="capitalize">{s.source}</span>
                    <span className="font-semibold tabular-nums">{s.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top companies</CardTitle>
          </CardHeader>
          <CardContent>
            {data.topCompanies.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {data.topCompanies.map((s) => (
                  <li key={s.company} className="flex items-center justify-between">
                    <span className="truncate pr-3">{s.company}</span>
                    <span className="font-semibold tabular-nums">{s.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
