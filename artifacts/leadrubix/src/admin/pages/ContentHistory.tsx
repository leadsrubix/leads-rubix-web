import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type ContentVersion } from "../lib/api";
import { KNOWN_SECTIONS } from "../lib/contentSchemas";

export default function AdminContentHistory() {
  const [, params] = useRoute("/admin/content/:key/history");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const key = params?.key ? decodeURIComponent(params.key) : "";
  const known = KNOWN_SECTIONS.find((s) => s.key === key);

  const [versions, setVersions] = useState<ContentVersion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    try {
      const { versions } = await adminApi.getContentHistory(key);
      setVersions(versions);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load history");
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function restore(versionId: string) {
    if (!confirm("Restore this version? Current content will be replaced.")) return;
    setRestoringId(versionId);
    try {
      await adminApi.restoreContent(key, versionId);
      toast({ title: "Version restored", description: "Public site updated." });
      navigate(`/admin/content/${encodeURIComponent(key)}`);
    } catch (e) {
      toast({
        title: "Restore failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRestoringId(null);
    }
  }

  if (error) return <div className="text-red-600 text-sm">{error}</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" data-testid="btn-back-content">
          <Link href={`/admin/content/${encodeURIComponent(key)}`}>
            <ArrowLeft className="size-4 mr-1" /> Back to editor
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold">History — {known?.label ?? key}</h1>
          <p className="text-xs text-muted-foreground font-mono">{key}</p>
        </div>
      </div>

      {versions === null ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : versions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved versions yet.</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {versions.map((v) => (
                <li key={v.id} className="px-4 md:px-5 py-4 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="text-sm font-medium tabular-nums">
                        {new Date(v.savedAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Saved by {v.savedBy ?? "system"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setExpanded((cur) => (cur === v.id ? null : v.id))
                        }
                        data-testid={`btn-toggle-version-${v.id}`}
                      >
                        {expanded === v.id ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void restore(v.id)}
                        disabled={restoringId === v.id}
                        data-testid={`btn-restore-version-${v.id}`}
                      >
                        <RotateCcw className="size-3.5 mr-1.5" />
                        {restoringId === v.id ? "Restoring…" : "Restore"}
                      </Button>
                    </div>
                  </div>
                  {expanded === v.id ? (
                    <pre className="text-xs bg-slate-50 border rounded p-3 overflow-x-auto whitespace-pre-wrap max-h-72">
                      {JSON.stringify(v.value, null, 2)}
                    </pre>
                  ) : null}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
