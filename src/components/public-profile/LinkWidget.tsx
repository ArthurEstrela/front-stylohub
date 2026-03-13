"use client";

import { publicApi } from "@/lib/api";
import type { Widget } from "@/types/widget";
import { ExternalLink } from "lucide-react";

interface LinkWidgetProps {
  widget: Widget;
  username: string;
}

/**
 * Renders a public-facing link button. On click, fires an analytics tracking
 * request (fire-and-forget) then navigates to the target URL.
 * Styles are driven by CSS variables set by ThemeRenderer.
 */
export function LinkWidget({ widget, username }: LinkWidgetProps) {
  const { title, url } = widget.config;
  if (!url) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Fire-and-forget click tracking — don't block navigation
    publicApi.trackClick(username, widget.id).catch(() => {
      // Silently ignore tracking errors
    });

    // Allow the default anchor behavior to continue
    // If you need to ensure tracking before navigation for internal links,
    // you could add e.preventDefault() + window.location.href = url
    void e;
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group w-full flex items-center justify-center gap-2 py-3 px-5 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: "var(--profile-primary)",
        color: "var(--profile-text)",
        borderRadius: "var(--profile-btn-radius, 12px)",
      }}
    >
      <span className="flex-1 text-center truncate">{title || url}</span>
      <ExternalLink
        size={14}
        className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );
}
