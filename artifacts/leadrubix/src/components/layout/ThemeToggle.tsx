import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="btn-theme-toggle"
      className={`h-9 w-9 inline-flex items-center justify-center rounded-full border border-[#252140]/15 dark:border-white/15 text-[#252140]/70 dark:text-white/80 hover:text-[#252140] dark:hover:text-white hover:bg-[#252140]/5 dark:hover:bg-white/10 transition-colors ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
