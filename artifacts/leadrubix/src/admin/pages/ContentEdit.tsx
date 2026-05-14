import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, History, Plus, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi } from "../lib/api";
import { KNOWN_SECTIONS } from "../lib/contentSchemas";

const IMAGE_FIELD_RE = /^(logoImageUrl|logoLightUrl|logoDarkUrl|faviconUrl|defaultOgImage|ogImage|coverImage|featuredImage|logo|image|imageUrl)$/i;

function ImageField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const label = humaniseKey(fieldKey);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await adminApi.uploadFile(file);
      onChange(url);
      toast({ title: "Image uploaded", description: file.name });
    } catch (e) {
      toast({
        title: "Upload failed",
        description: e instanceof Error ? e.message : "Try again",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldKey}>{label}</Label>
      <div className="flex gap-2 items-start">
        {value ? (
          <img
            src={value}
            alt=""
            className="size-14 rounded border bg-slate-50 object-contain shrink-0"
            onError={(e) => ((e.currentTarget.style.opacity = "0.3"))}
          />
        ) : (
          <div className="size-14 rounded border bg-slate-50 shrink-0" />
        )}
        <div className="flex-1 space-y-2">
          <Input
            id={fieldKey}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://… or upload below"
            data-testid={`field-${fieldKey}`}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              data-testid={`btn-upload-${fieldKey}`}
            >
              <Upload className="size-3.5 mr-1.5" />
              {uploading ? "Uploading…" : "Upload image"}
            </Button>
            {value ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onChange("")}
                data-testid={`btn-clear-${fieldKey}`}
              >
                Clear
              </Button>
            ) : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminContentEdit() {
  const [, params] = useRoute("/admin/content/:key");
  const { toast } = useToast();
  const key = params?.key ? decodeURIComponent(params.key) : "";
  const known = KNOWN_SECTIONS.find((s) => s.key === key);

  const [value, setValue] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { section } = await adminApi.getContent(key);
        if (active) setValue(section.value);
      } catch (e) {
        if (e instanceof Error && (e as Error & { status?: number }).status === 404) {
          if (active) setValue(known?.defaultValue ?? {});
        } else if (active) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [key, known]);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await adminApi.putContent(key, value);
      toast({ title: "Content saved", description: "Changes are live on the public site." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Save failed";
      setError(msg);
      toast({ title: "Save failed", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (value === null) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" data-testid="btn-back-content">
            <Link href="/admin/content">
              <ArrowLeft className="size-4 mr-1" /> Back
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{known?.label ?? key}</h1>
            <p className="text-xs text-muted-foreground font-mono">{key}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" data-testid="btn-content-history">
            <Link href={`/admin/content/${encodeURIComponent(key)}/history`}>
              <History className="size-4 mr-1.5" /> History
            </Link>
          </Button>
          {known ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setValue(known.defaultValue)}
              data-testid="btn-reset-content"
            >
              Reset to default
            </Button>
          ) : null}
          <Button onClick={save} disabled={saving} data-testid="btn-save-content">
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content</CardTitle>
        </CardHeader>
        <CardContent>
          <ValueEditor value={value} onChange={setValue} />
        </CardContent>
      </Card>
    </div>
  );
}

function ValueEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (Array.isArray(value)) {
    return <ArrayEditor value={value} onChange={onChange} />;
  }
  if (value && typeof value === "object") {
    return <ObjectEditor value={value as Record<string, unknown>} onChange={onChange} />;
  }
  return <JsonEditor value={value} onChange={onChange} />;
}

function ObjectEditor({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-4">
      {Object.entries(value).map(([k, v]) => (
        <FieldEditor
          key={k}
          fieldKey={k}
          value={v}
          onChange={(next) => onChange({ ...value, [k]: next })}
        />
      ))}
    </div>
  );
}

function FieldEditor({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = humaniseKey(fieldKey);

  if (typeof value === "string" && IMAGE_FIELD_RE.test(fieldKey)) {
    return <ImageField fieldKey={fieldKey} value={value} onChange={(v) => onChange(v)} />;
  }

  if (typeof value === "string") {
    const isLong = value.length > 80 || /\n/.test(value) || /(answer|body|description)/i.test(fieldKey);
    return (
      <div className="space-y-1.5">
        <Label htmlFor={fieldKey}>{label}</Label>
        {isLong ? (
          <Textarea
            id={fieldKey}
            value={value}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            data-testid={`field-${fieldKey}`}
          />
        ) : (
          <Input
            id={fieldKey}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid={`field-${fieldKey}`}
          />
        )}
      </div>
    );
  }
  if (typeof value === "number") {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={fieldKey}>{label}</Label>
        <Input
          id={fieldKey}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          data-testid={`field-${fieldKey}`}
        />
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          data-testid={`field-${fieldKey}`}
        />
        {label}
      </label>
    );
  }
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2 border-l-2 border-slate-200 pl-4">
        <div className="text-sm font-medium">{label}</div>
        <ArrayEditor value={value} onChange={(v) => onChange(v)} />
      </div>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="space-y-2 border-l-2 border-slate-200 pl-4">
        <div className="text-sm font-medium">{label}</div>
        <ObjectEditor
          value={value as Record<string, unknown>}
          onChange={(v) => onChange(v)}
        />
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldKey}>{label}</Label>
      <Input
        id={fieldKey}
        value={value === null || value === undefined ? "" : String(value)}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`field-${fieldKey}`}
      />
    </div>
  );
}

function ArrayEditor({
  value,
  onChange,
}: {
  value: unknown[];
  onChange: (v: unknown[]) => void;
}) {
  function addItem() {
    if (value.length > 0 && value[0] && typeof value[0] === "object" && !Array.isArray(value[0])) {
      const blank: Record<string, unknown> = {};
      Object.keys(value[0] as Record<string, unknown>).forEach((k) => {
        const v = (value[0] as Record<string, unknown>)[k];
        blank[k] = typeof v === "string" ? "" : typeof v === "number" ? 0 : typeof v === "boolean" ? false : Array.isArray(v) ? [] : v && typeof v === "object" ? {} : "";
      });
      onChange([...value, blank]);
    } else if (value.length > 0 && typeof value[0] === "string") {
      onChange([...value, ""]);
    } else {
      onChange([...value, {}]);
    }
  }

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="border rounded-md p-3 space-y-3 bg-slate-50/40">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-slate-500">Item #{i + 1}</div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              data-testid={`btn-remove-item-${i}`}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
          <ValueEditor
            value={item}
            onChange={(next) => onChange(value.map((x, j) => (j === i ? next : x)))}
          />
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={addItem}
        data-testid="btn-add-item"
      >
        <Plus className="size-3.5 mr-1.5" /> Add item
      </Button>
    </div>
  );
}

function JsonEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <Textarea
        rows={14}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="font-mono text-xs"
        data-testid="textarea-json-editor"
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            try {
              const parsed = JSON.parse(text);
              setErr(null);
              onChange(parsed);
            } catch (e) {
              setErr(e instanceof Error ? e.message : "Invalid JSON");
            }
          }}
          data-testid="btn-apply-json"
        >
          Apply JSON
        </Button>
        {err ? <span className="text-xs text-red-600">{err}</span> : null}
      </div>
    </div>
  );
}

function humaniseKey(k: string): string {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}
