import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { adminApi, type ContentSection } from "../lib/api";
import { KNOWN_SECTIONS } from "../lib/contentSchemas";

export default function AdminContent() {
  const [saved, setSaved] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .listContent()
      .then(({ sections }) => setSaved(sections))
      .finally(() => setLoading(false));
  }, []);

  const savedKeys = new Set(saved.map((s) => s.key));
  const known = KNOWN_SECTIONS.map((def) => ({
    ...def,
    saved: saved.find((s) => s.key === def.key) ?? null,
  }));
  const customSections = saved.filter((s) => !KNOWN_SECTIONS.some((k) => k.key === s.key));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Site content</h1>
        <p className="text-sm text-muted-foreground">
          Edit copy that appears on the public website. Changes go live immediately.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {known.map((s) => (
                <li
                  key={s.key}
                  className="px-4 md:px-5 py-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{s.label}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono truncate">{s.key}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {savedKeys.has(s.key) ? (
                      <span className="text-[11px] uppercase tracking-wide bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        Customised
                      </span>
                    ) : (
                      <span className="text-[11px] uppercase tracking-wide bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      data-testid={`btn-edit-${s.key}`}
                    >
                      <Link href={`/admin/content/${encodeURIComponent(s.key)}`}>
                        <Pencil className="size-3.5 mr-1.5" /> Edit
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
              {customSections.map((s) => (
                <li
                  key={s.key}
                  className="px-4 md:px-5 py-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{s.key}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">Custom section</p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    data-testid={`btn-edit-${s.key}`}
                  >
                    <Link href={`/admin/content/${encodeURIComponent(s.key)}`}>
                      <Pencil className="size-3.5 mr-1.5" /> Edit
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
