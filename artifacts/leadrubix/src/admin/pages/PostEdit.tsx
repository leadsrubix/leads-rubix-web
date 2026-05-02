import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Trash2 } from "lucide-react";
import { adminApi, type PostInput } from "../lib/api";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 120);
}

export default function AdminPostEdit() {
  const [matchEdit, paramsEdit] = useRoute("/admin/posts/:id");
  const [, navigate] = useLocation();
  const isNew = !matchEdit || paramsEdit?.id === "new";
  const id = !isNew ? paramsEdit?.id : undefined;

  const [form, setForm] = useState<PostInput>({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    coverImage: "",
    status: "draft",
  });
  const [touchedSlug, setTouchedSlug] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew || !id) return;
    adminApi
      .getPost(id)
      .then(({ post }) => {
        setForm({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage ?? "",
          status: post.status,
        });
        setTouchedSlug(true);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function update<K extends keyof PostInput>(key: K, value: PostInput[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !touchedSlug) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function save(publishOverride?: "draft" | "published") {
    setSaving(true);
    setError(null);
    try {
      const payload: PostInput = {
        ...form,
        slug: form.slug.trim(),
        coverImage: form.coverImage?.trim() ? form.coverImage : null,
        status: publishOverride ?? form.status,
      };
      if (isNew) {
        const { post } = await adminApi.createPost(payload);
        navigate(`/admin/posts/${post.id}`, { replace: true });
      } else if (id) {
        await adminApi.updatePost(id, payload);
        if (publishOverride) {
          setForm((f) => ({ ...f, status: publishOverride }));
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this post permanently?")) return;
    await adminApi.deletePost(id);
    navigate("/admin/posts");
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" data-testid="btn-back-posts">
            <Link href="/admin/posts">
              <ArrowLeft className="size-4 mr-1" /> Back
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{isNew ? "New post" : "Edit post"}</h1>
        </div>
        <div className="flex gap-2">
          {!isNew ? (
            <Button variant="destructive" onClick={remove} data-testid="btn-delete-post">
              <Trash2 className="size-4 mr-2" /> Delete
            </Button>
          ) : null}
          <Button
            variant="outline"
            onClick={() => save("draft")}
            disabled={saving}
            data-testid="btn-save-draft"
          >
            Save draft
          </Button>
          <Button
            onClick={() => save("published")}
            disabled={saving}
            data-testid="btn-publish"
          >
            {form.status === "published" ? "Save & republish" : "Publish"}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-md px-3 py-2">
          {error}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Article</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              data-testid="input-post-title"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setTouchedSlug(true);
                update("slug", slugify(e.target.value));
              }}
              data-testid="input-post-slug"
            />
            <p className="text-xs text-muted-foreground">
              Public URL: /blog/{form.slug || "your-slug"}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              rows={2}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              data-testid="input-post-excerpt"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cover">Cover image URL (optional)</Label>
            <Input
              id="cover"
              value={form.coverImage ?? ""}
              onChange={(e) => update("coverImage", e.target.value)}
              placeholder="https://…"
              data-testid="input-post-cover"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Body (plain text or simple HTML)</Label>
            <Textarea
              id="body"
              rows={18}
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              className="font-mono text-sm"
              data-testid="input-post-body"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => update("status", v as "draft" | "published")}
            >
              <SelectTrigger className="w-48" data-testid="select-post-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
