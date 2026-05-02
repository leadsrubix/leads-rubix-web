import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminApi, type AnalyticsResponse } from "../lib/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .analytics()
      .then((d) => setData(d))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Lead intake at a glance.</p>
        </div>
        <Button asChild data-testid="btn-view-leads">
          <Link href="/admin/leads">View all leads</Link>
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Submissions, last 30 days</CardTitle>
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
