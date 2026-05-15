import { Link, useLocation } from "wouter";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Newspaper,
  Users,
  ScrollText,
  PieChart,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { CommandPalette } from "./CommandPalette";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/sources", label: "Lead sources", icon: PieChart },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/posts", label: "Blog", icon: Newspaper },
  { href: "/admin/users", label: "Admins", icon: Users },
  { href: "/admin/audit", label: "Audit log", icon: ScrollText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-white border-b flex items-center justify-between px-4">
        <Link href="/admin" className="font-semibold text-base" data-testid="link-admin-home">
          Leads Rubix Admin
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 -mr-2"
          aria-label="Toggle menu"
          data-testid="btn-admin-menu-toggle"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-slate-100 flex flex-col transform transition-transform md:translate-x-0 md:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-slate-800 hidden md:block">
          <Link href="/admin" className="font-semibold text-base" data-testid="link-admin-logo">
            Leads Rubix Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 mt-14 md:mt-0">
          <ul className="space-y-0.5 px-2">
            {NAV.map((item) => {
              const active = item.exact
                ? location === item.href
                : location === item.href || location.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      active
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-slate-800 px-3 py-3 space-y-2">
          <a
            href="/"
            className="flex items-center gap-2 px-2 py-2 text-xs text-slate-400 hover:text-white"
            data-testid="link-view-site"
          >
            <ExternalLink className="size-3.5" /> View site
          </a>
          <Link
            href="/admin/security"
            className="block px-2 py-1 text-xs text-slate-400 hover:text-white"
            data-testid="link-security"
          >
            Security &amp; 2FA
          </Link>
          <Link
            href="/admin/change-password"
            className="block px-2 py-1 text-xs text-slate-400 hover:text-white"
            data-testid="link-change-password"
          >
            Change password
          </Link>
          <div className="px-2 text-xs text-slate-400 truncate" title={user?.email}>
            {user?.name}
            <div className="truncate text-slate-500">{user?.email}</div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => void logout()}
            data-testid="btn-admin-logout"
          >
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <main className="flex-1 min-w-0 h-screen overflow-hidden flex flex-col pt-14 md:pt-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </main>

      <CommandPalette />
    </div>
  );
}
