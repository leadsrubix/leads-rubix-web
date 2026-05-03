import { useEffect, useState } from "react";
import { Link } from "wouter";
import AdminLayout from "../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Inbox } from "lucide-react";

interface SourceRow {
  source: string;
  total: number;
  last30: number;
  won: number;
  lost: number;
}

interface Resp {
  rows: SourceRow[];
  totalAll: number;
  total30: number;
}

export default function AdminSources() {
  const [data, setData] = useState<Resp | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/leads/by-source", { credentials: "same-origin" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as Resp;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const max = data && data.rows.length > 0 ? Math.max(...data.rows.map((r) => r.total)) : 0;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead sources</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Where your leads come from. Click a row to filter the lead inbox by that source.
          </p>
        </div>
      </div>

      {error ? (
        <Card>
          <CardContent className="p-6 text-sm text-rose-700" data-testid="sources-error">
            Couldn't load source breakdown: {error}
          </CardContent>
        </Card>
      ) : !data ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">Loading…</CardContent>
        </Card>
      ) : data.rows.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground" data-testid="sources-empty">
            <Inbox className="h-8 w-8 mx-auto mb-3 opacity-40" />
            No leads yet — once leads start coming in, you'll see source breakdown here.
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                Total leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="stat-total-all">
                {data.totalAll.toLocaleString("en-IN")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                Last 30 days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="stat-total-30">
                {data.total30.toLocaleString("en-IN")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                Distinct sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="stat-source-count">
                {data.rows.length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {data && data.rows.length > 0 ? (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-slate-50 border-b">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold w-2/5">Volume</th>
                  <th className="px-4 py-3 font-semibold text-right">Total</th>
                  <th className="px-4 py-3 font-semibold text-right">Last 30 days</th>
                  <th className="px-4 py-3 font-semibold text-right">Won</th>
                  <th className="px-4 py-3 font-semibold text-right">Lost</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => {
                  const pct = max > 0 ? Math.round((r.total / max) * 100) : 0;
                  return (
                    <tr
                      key={r.source}
                      className="border-b last:border-b-0 hover:bg-slate-50/60 transition-colors"
                      data-testid={`source-row-${r.source}`}
                    >
                      <td className="px-4 py-3 font-medium">{r.source}</td>
                      <td className="px-4 py-3">
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-[#252140] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums font-semibold">
                        {r.total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {r.last30.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-emerald-700">
                        {r.won.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-rose-700">
                        {r.lost.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/leads?source=${encodeURIComponent(r.source)}`}
                          className="text-xs font-semibold text-[#252140] inline-flex items-center gap-1 hover:underline"
                          data-testid={`link-filter-${r.source}`}
                        >
                          View <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : null}
    </AdminLayout>
  );
}
