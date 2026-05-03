import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { adminApi, type Post } from "../lib/api";

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .listPosts()
      .then(({ posts }) => setPosts(posts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Articles published at <code className="text-xs">/blog</code>.
          </p>
        </div>
        <Button asChild data-testid="btn-new-post">
          <Link href="/admin/posts/new">
            <Plus className="size-4 mr-2" /> New post
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {/* desktop table */}
          <table className="w-full text-sm hidden md:table">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    No posts yet.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 font-mono text-xs">{p.slug}</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.status === "published" ? "default" : "outline"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {new Date(p.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        data-testid={`btn-edit-post-${p.id}`}
                      >
                        <Link href={`/admin/posts/${p.id}`}>Edit</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* mobile cards */}
          <ul className="md:hidden divide-y">
            {loading ? (
              <li className="px-4 py-6 text-center text-muted-foreground">Loading…</li>
            ) : posts.length === 0 ? (
              <li className="px-4 py-10 text-center text-muted-foreground">No posts yet.</li>
            ) : (
              posts.map((p) => (
                <li key={p.id} className="px-4 py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={p.status === "published" ? "default" : "outline"}
                        className="text-[10px]"
                      >
                        {p.status}
                      </Badge>
                      <span className="text-[11px] text-slate-500 tabular-nums">
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-medium truncate">{p.title}</div>
                    <div className="font-mono text-[11px] text-slate-500 truncate">{p.slug}</div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    data-testid={`btn-edit-post-${p.id}`}
                  >
                    <Link href={`/admin/posts/${p.id}`}>Edit</Link>
                  </Button>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
