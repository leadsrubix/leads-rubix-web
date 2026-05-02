import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Search } from "lucide-react";
import { adminApi, type Lead } from "../lib/api";

const STATUS_OPTIONS = ["all", "new", "contacted", "qualified", "won", "lost", "spam"] as const;
const SOURCE_OPTIONS = ["all", "contact", "demo"] as const;
const PAGE_SIZE = 25;

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  contacted: "secondary",
  qualified: "secondary",
  won: "default",
  lost: "outline",
  spam: "destructive",
};

export default function AdminLeads() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminApi.listLeads({
        q,
        status: status === "all" ? undefined : status,
        source: source === "all" ? undefined : source,
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
  }, [status, source, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">{total} total submissions</p>
        </div>
        <Button asChild variant="outline" data-testid="btn-export-leads">
          <a href="/api/admin/leads/export.csv">
            <Download className="size-4 mr-2" /> Export CSV
          </a>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form
            className="grid grid-cols-1 md:grid-cols-[1fr_180px_180px_auto] gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              void load();
            }}
          >
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search name, email, company, message…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9"
                data-testid="input-leads-search"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger data-testid="select-leads-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    Status: {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger data-testid="select-leads-source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    Source: {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" data-testid="btn-leads-search">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    No leads found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap tabular-nums text-slate-600">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{r.company}</div>
                      <div className="text-xs text-slate-500">{r.phone}</div>
                    </td>
                    <td className="px-4 py-3 capitalize">{r.source}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[r.status] ?? "secondary"} className="capitalize">
                        {r.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        data-testid={`btn-lead-open-${r.id}`}
                      >
                        <Link href={`/admin/leads/${r.id}`}>Open</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
            data-testid="btn-leads-prev"
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-testid="btn-leads-next"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
