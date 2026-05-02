import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trash2 } from "lucide-react";
import { adminApi, type Lead } from "../lib/api";

const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];

export default function AdminLeadDetail() {
  const [, params] = useRoute("/admin/leads/:id");
  const [, navigate] = useLocation();
  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    adminApi
      .getLead(params.id)
      .then(({ lead }) => {
        setLead(lead);
        setStatus(lead.status);
        setNotes(lead.notes ?? "");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  }, [params?.id]);

  async function save() {
    if (!lead) return;
    setSaving(true);
    setError(null);
    try {
      const { lead: updated } = await adminApi.updateLead(lead.id, { status, notes });
      setLead(updated);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!lead) return;
    if (!confirm("Delete this lead permanently?")) return;
    await adminApi.deleteLead(lead.id);
    navigate("/admin/leads");
  }

  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (!lead) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" data-testid="btn-back-leads">
            <Link href="/admin/leads">
              <ArrowLeft className="size-4 mr-1" /> Back
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{lead.name}</h1>
            <p className="text-xs text-muted-foreground">
              Submitted {new Date(lead.createdAt).toLocaleString()} · source {lead.source}
            </p>
          </div>
        </div>
        <Button variant="destructive" onClick={remove} data-testid="btn-delete-lead">
          <Trash2 className="size-4 mr-2" /> Delete
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Submission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Field label="Name" value={lead.name} />
            <Field label="Email" value={<a href={`mailto:${lead.email}`} className="underline">{lead.email}</a>} />
            <Field label="Phone" value={<a href={`tel:${lead.phone}`} className="underline">{lead.phone}</a>} />
            <Field label="Company" value={lead.company} />
            <Field label="Team size" value={lead.teamSize ?? "—"} />
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Message</div>
              <div className="whitespace-pre-wrap leading-relaxed">{lead.message}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status &amp; notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500 mb-1 block">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger data-testid="select-lead-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500 mb-1 block">
                Internal notes
              </label>
              <Textarea
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Call summary, next steps, qualification notes…"
                data-testid="textarea-lead-notes"
              />
            </div>
            <Button onClick={save} disabled={saving} data-testid="btn-save-lead">
              {saving ? "Saving…" : "Save"}
            </Button>
            {savedAt ? (
              <p className="text-xs text-green-700">Saved at {savedAt}</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 items-start">
      <div className="text-xs uppercase tracking-wide text-slate-500 mt-0.5">{label}</div>
      <div>{value}</div>
    </div>
  );
}
