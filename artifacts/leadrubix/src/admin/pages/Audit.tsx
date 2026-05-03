import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { adminApi, type AuditEvent } from "../lib/api";

const PAGE_SIZE = 50;

export default function AdminAudit() {
  const [rows, setRows] = useState<AuditEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminApi.listAudit({
        action: action || undefined,
        entityType: entityType || undefined,
        page,
        pageSize: PAGE_SIZE,
      });
      setRows(data.rows);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Audit log</h1>
        <p className="text-sm text-muted-foreground">{total} recorded events</p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              void load();
            }}
          >
            <Input
              placeholder="Action (e.g. lead_updated)"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              data-testid="input-audit-action"
            />
            <Input
              placeholder="Entity type (lead, post, content_section…)"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              data-testid="input-audit-entity"
            />
            <Button type="submit" data-testid="btn-audit-search">
              Filter
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm hidden md:table">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Who</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`as-${i}`} className="border-t" data-testid={`audit-skeleton-row-${i}`}>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-24 mb-1" /><Skeleton className="h-3 w-32" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-28" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-48" /></td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    No audit events.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 whitespace-nowrap tabular-nums text-slate-600">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.actorName ?? "—"}</div>
                      <div className="text-xs text-slate-500">{r.actorEmail ?? "system"}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{r.action}</td>
                    <td className="px-4 py-3 text-xs">
                      <div className="text-slate-700">{r.entityType ?? "—"}</div>
                      {r.entityId ? (
                        <div className="font-mono text-[10px] text-slate-400 truncate max-w-[180px]">
                          {r.entityId}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 max-w-[300px] truncate">
                      {r.payload ? JSON.stringify(r.payload) : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* mobile cards */}
          <ul className="md:hidden divide-y">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <li key={`ams-${i}`} className="px-4 py-3 space-y-1.5" data-testid={`audit-skeleton-mobile-${i}`}>
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </li>
              ))
            ) : rows.length === 0 ? (
              <li className="px-4 py-10 text-center text-muted-foreground">No audit events.</li>
            ) : (
              rows.map((r) => (
                <li key={r.id} className="px-4 py-3 space-y-1">
                  <div className="text-xs text-slate-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium">
                    {r.actorEmail ?? "system"} · <span className="font-mono">{r.action}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {r.entityType ?? "—"}
                    {r.entityId ? ` · ${r.entityId}` : ""}
                  </div>
                  {r.payload ? (
                    <div className="text-[11px] font-mono text-slate-500 truncate">
                      {JSON.stringify(r.payload)}
                    </div>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            data-testid="btn-audit-prev"
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-testid="btn-audit-next"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
