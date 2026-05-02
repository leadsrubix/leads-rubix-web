import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const isNew = !matchEdit || paramsEdit?.id === "new";
  const id = !isNew ? paramsEdit?.id : undefined;

  const [form, setForm] = useState<PostInput>({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    coverImage: "",
    metaDescription: "",
    ogImage: "",
    tags: [],
    status: "draft",
  });
  const [tagDraft, setTagDraft] = useState("");
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
          metaDescription: post.metaDescription ?? "",
          ogImage: post.ogImage ?? "",
          tags: post.tags ?? [],
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

  function addTag() {
    const v = tagDraft.trim();
    if (!v) return;
    if ((form.tags ?? []).includes(v)) {
      setTagDraft("");
      return;
    }
    update("tags", [...(form.tags ?? []), v]);
    setTagDraft("");
  }

  async function save(publishOverride?: "draft" | "published") {
    setSaving(true);
    setError(null);
    try {
      const payload: PostInput = {
        ...form,
        slug: form.slug.trim(),
        coverImage: form.coverImage?.trim() ? form.coverImage : null,
        ogImage: form.ogImage?.trim() ? form.ogImage : null,
        metaDescription: form.metaDescription?.trim() ? form.metaDescription : null,
        tags: form.tags ?? [],
        status: publishOverride ?? form.status,
      };
      if (isNew) {
        const { post } = await adminApi.createPost(payload);
        toast({
          title:
            publishOverride === "published"
              ? "Post published"
              : "Post created",
          description: post.title,
        });
        navigate(`/admin/posts/${post.id}`, { replace: true });
      } else if (id) {
        await adminApi.updatePost(id, payload);
        toast({
          title:
            publishOverride === "published"
              ? "Post published"
              : publishOverride === "draft"
                ? "Saved as draft"
                : "Post saved",
        });
        if (publishOverride) {
          setForm((f) => ({ ...f, status: publishOverride }));
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Save failed";
      setError(msg);
      toast({ title: "Save failed", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this post permanently?")) return;
    await adminApi.deletePost(id);
    toast({ title: "Post deleted" });
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
            <Label htmlFor="cover">Featured image</Label>
            <div className="flex gap-2">
              <Input
                id="cover"
                value={form.coverImage ?? ""}
                onChange={(e) => update("coverImage", e.target.value)}
                placeholder="Paste URL or upload below"
                data-testid="input-post-cover"
              />
              <input
                type="file"
                accept="image/*"
                id="cover-upload"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  try {
                    const url = await adminApi.uploadFile(file);
                    update("coverImage", url);
                    toast({ title: "Image uploaded" });
                  } catch (err) {
                    toast({
                      title: "Upload failed",
                      description: err instanceof Error ? err.message : "Try again",
                      variant: "destructive",
                    });
                  }
                }}
                data-testid="input-cover-file"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cover-upload")?.click()}
                data-testid="btn-upload-cover"
              >
                Upload
              </Button>
            </div>
            {form.coverImage ? (
              <img
                src={form.coverImage}
                alt="Cover preview"
                className="mt-2 rounded-md border max-h-40 object-cover"
              />
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label>Body (Markdown)</Label>
            <Tabs defaultValue="write" className="w-full">
              <TabsList>
                <TabsTrigger value="write" data-testid="tab-write">
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" data-testid="tab-preview">
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  id="body"
                  rows={18}
                  value={form.body}
                  onChange={(e) => update("body", e.target.value)}
                  className="font-mono text-sm"
                  data-testid="input-post-body"
                  placeholder="# Heading&#10;&#10;Markdown supported. **Bold**, _italic_, [links](https://example.com), lists, code blocks…"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div
                  className="prose prose-slate max-w-none border rounded-md p-4 min-h-[400px] bg-white"
                  data-testid="post-preview"
                >
                  {form.body.trim().length === 0 ? (
                    <p className="text-muted-foreground">Nothing to preview yet.</p>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                      {form.body}
                    </ReactMarkdown>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-1.5">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(form.tags ?? []).length === 0 ? (
                <span className="text-xs text-muted-foreground">No tags yet.</span>
              ) : (
                (form.tags ?? []).map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1">
                    {t}
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          "tags",
                          (form.tags ?? []).filter((x) => x !== t),
                        )
                      }
                      className="hover:text-red-600"
                      aria-label={`Remove ${t}`}
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
                data-testid="input-post-tag"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search engine optimisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="meta">Meta description</Label>
            <Textarea
              id="meta"
              rows={2}
              value={form.metaDescription ?? ""}
              onChange={(e) => update("metaDescription", e.target.value)}
              placeholder="Short summary shown in search results (max 300 chars)."
              maxLength={300}
              data-testid="input-post-meta"
            />
            <p className="text-xs text-muted-foreground">
              {(form.metaDescription ?? "").length} / 300
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="og">Open Graph image URL</Label>
            <Input
              id="og"
              value={form.ogImage ?? ""}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="https://… (1200×630 recommended)"
              data-testid="input-post-og"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
