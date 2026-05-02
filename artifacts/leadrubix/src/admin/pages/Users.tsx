import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { adminApi, type AdminUser } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", name: "", role: "admin", password: "" });
  const [creating, setCreating] = useState(false);

  async function reload() {
    setLoading(true);
    try {
      const { users } = await adminApi.listUsers();
      setUsers(users);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      await adminApi.createUser(form);
      setForm({ email: "", name: "", role: "admin", password: "" });
      setOpen(false);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create user");
    } finally {
      setCreating(false);
    }
  }

  async function remove(u: AdminUser) {
    if (!confirm(`Delete admin ${u.email}?`)) return;
    try {
      await adminApi.deleteUser(u.id);
      await reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not delete user");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Admins</h1>
          <p className="text-sm text-muted-foreground">
            People with access to this control panel.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="btn-new-user">
              <Plus className="size-4 mr-2" /> Invite admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a new admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={create} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="u-email">Email</Label>
                <Input
                  id="u-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="input-user-email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="u-name">Name</Label>
                <Input
                  id="u-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="input-user-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="u-role">Role</Label>
                <Input
                  id="u-role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  data-testid="input-user-role"
                />
                <p className="text-xs text-muted-foreground">
                  Free-text label, e.g. <code>admin</code>, <code>owner</code>, <code>support</code>.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="u-password">Initial password</Label>
                <Input
                  id="u-password"
                  type="text"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  data-testid="input-user-password"
                />
                <p className="text-xs text-muted-foreground">
                  Share this with the admin out-of-band. They can change it later.
                </p>
              </div>
              {error ? (
                <p className="text-sm text-red-600" data-testid="text-user-error">
                  {error}
                </p>
              ) : null}
              <DialogFooter>
                <Button type="submit" disabled={creating} data-testid="btn-create-user">
                  {creating ? "Creating…" : "Create admin"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Created</th>
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
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{u.email}</td>
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3 capitalize">{u.role}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={u.id === me?.id}
                        onClick={() => void remove(u)}
                        data-testid={`btn-delete-user-${u.id}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
