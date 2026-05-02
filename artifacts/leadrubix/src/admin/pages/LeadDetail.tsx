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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, X, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type Lead, type LeadActivity, type AdminUser } from "../lib/api";

const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];
const UNASSIGNED = "__unassigned__";

export default function AdminLeadDetail() {
  const [, params] = useRoute("/admin/leads/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState<string>(UNASSIGNED);
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadActivities(id: string) {
    try {
      const { activities } = await adminApi.getLeadActivities(id);
      setActivities(activities);
    } catch {
      // ignore — activities optional
    }
  }

  useEffect(() => {
    if (!params?.id) return;
    adminApi
      .getLead(params.id)
      .then(({ lead }) => {
        setLead(lead);
        setStatus(lead.status);
        setNotes(lead.notes ?? "");
        setAssignedTo(lead.assignedTo ?? UNASSIGNED);
        setTags(Array.isArray(lead.tags) ? lead.tags : []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
    void loadActivities(params.id);
    adminApi
      .listUsers()
      .then(({ users }) => setAdmins(users))
      .catch(() => setAdmins([]));
  }, [params?.id]);

  function addTag() {
    const v = tagDraft.trim();
    if (!v) return;
    if (tags.includes(v)) {
      setTagDraft("");
      return;
    }
    setTags((t) => [...t, v]);
    setTagDraft("");
  }

  async function save() {
    if (!lead) return;
    setSaving(true);
    setError(null);
    try {
      const { lead: updated } = await adminApi.updateLead(lead.id, {
        status,
        notes,
        assignedTo: assignedTo === UNASSIGNED ? null : assignedTo,
        tags,
      });
      setLead(updated);
      toast({ title: "Lead updated", description: "Changes saved." });
      void loadActivities(updated.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Save failed";
      setError(msg);
      toast({ title: "Save failed", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!lead) return;
    if (!confirm("Delete this lead permanently?")) return;
    await adminApi.deleteLead(lead.id);
    toast({ title: "Lead deleted" });
    navigate("/admin/leads");
  }

  if (error && !lead) return <div className="text-red-600 text-sm">{error}</div>;
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
            <CardTitle className="text-base">Status &amp; assignment</CardTitle>
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
                Assignee
              </label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger data-testid="select-lead-assignee">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                  {admins.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name} · {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500 mb-1 block">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.length === 0 ? (
                  <span className="text-xs text-muted-foreground">No tags yet.</span>
                ) : (
                  tags.map((t) => (
                    <Badge key={t} variant="secondary" className="gap-1" data-testid={`tag-${t}`}>
                      {t}
                      <button
                        type="button"
                        onClick={() => setTags((arr) => arr.filter((x) => x !== t))}
                        className="hover:text-red-600"
                        aria-label={`Remove ${t}`}
                        data-testid={`btn-remove-tag-${t}`}
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  data-testid="input-tag-draft"
                />
                <Button type="button" variant="outline" size="sm" onClick={addTag} data-testid="btn-add-tag">
                  Add
                </Button>
              </div>
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="size-4" /> Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
          ) : (
            <ul className="space-y-3">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <span className="text-xs tabular-nums text-slate-400 shrink-0 mt-0.5 w-32">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                  <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                    {a.kind}
                  </span>
                  <span className="text-slate-600">
                    {a.actorName ?? a.actorEmail ?? "system"}
                    {a.payload && Object.keys(a.payload).length > 0 ? (
                      <span className="text-xs text-slate-500 ml-2">
                        {JSON.stringify(a.payload)}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
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
