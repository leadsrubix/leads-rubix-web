import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Newspaper,
  Users,
  ScrollText,
  Plus,
  Search,
  ExternalLink,
} from "lucide-react";

interface Action {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

/**
 * Cmd/Ctrl+K palette for quick admin navigation. Keyboard-first, no deps —
 * just a fixed-position dialog with simple substring filtering.
 */
export function CommandPalette() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Always allow Escape to close, regardless of focus.
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      // Don't intercept keys typed inside the palette's own input.
      if (target?.closest('[data-testid="admin-command-palette"]')) return;

      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          target.getAttribute("role") === "combobox" ||
          target.getAttribute("role") === "textbox");
      const isToggle = (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      const isSlash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !inField;

      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (isSlash) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const actions: Action[] = useMemo(() => {
    function go(href: string) {
      return () => {
        navigate(href);
        setOpen(false);
      };
    }
    return [
      { id: "go-dashboard", label: "Go to Dashboard", icon: LayoutDashboard, run: go("/admin") },
      { id: "go-leads", label: "Go to Leads", hint: "g l", icon: Inbox, run: go("/admin/leads") },
      { id: "go-content", label: "Go to Content", icon: FileText, run: go("/admin/content") },
      { id: "go-posts", label: "Go to Blog posts", icon: Newspaper, run: go("/admin/posts") },
      { id: "go-users", label: "Go to Admins", icon: Users, run: go("/admin/users") },
      { id: "go-audit", label: "Go to Audit log", icon: ScrollText, run: go("/admin/audit") },
      { id: "new-post", label: "New blog post", icon: Plus, run: go("/admin/posts/new") },
      {
        id: "open-public",
        label: "Open public site in new tab",
        icon: ExternalLink,
        run: () => {
          window.open("/", "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
    ];
  }, [navigate]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      data-testid="admin-command-palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered[0]) {
                e.preventDefault();
                filtered[0].run();
              }
            }}
            data-testid="input-command-palette"
          />
          <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">No matches</li>
          ) : (
            filtered.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={a.run}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-muted"
                    data-testid={`cmd-${a.id}`}
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="flex-1">{a.label}</span>
                    {a.hint ? (
                      <span className="text-[10px] text-muted-foreground">{a.hint}</span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground flex items-center justify-between">
          <span>
            <kbd className="border border-border rounded px-1">⌘</kbd>
            <kbd className="border border-border rounded px-1 ml-1">K</kbd>
            {" or "}
            <kbd className="border border-border rounded px-1">/</kbd>
            {" to open"}
          </span>
          <span>Enter to run</span>
        </div>
      </div>
    </div>
  );
}
