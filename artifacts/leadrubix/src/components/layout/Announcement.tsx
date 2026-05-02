import { useContent } from "@/lib/useContent";

interface AnnouncementContent {
  text: string;
  linkLabel?: string;
  linkHref?: string;
}

const DEFAULT: AnnouncementContent = { text: "", linkLabel: "", linkHref: "" };

export function Announcement() {
  const a = useContent<AnnouncementContent>("home_announcement", DEFAULT);
  if (!a.text || a.text.trim().length === 0) return null;
  const isExternal = a.linkHref?.startsWith("http");
  return (
    <div
      className="bg-primary text-primary-foreground text-sm py-2 px-4 text-center"
      data-testid="announcement-banner"
    >
      <span>{a.text}</span>
      {a.linkLabel && a.linkHref ? (
        <>
          {" "}
          <a
            href={a.linkHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="underline font-medium"
            data-testid="announcement-link"
          >
            {a.linkLabel}
          </a>
        </>
      ) : null}
    </div>
  );
}
