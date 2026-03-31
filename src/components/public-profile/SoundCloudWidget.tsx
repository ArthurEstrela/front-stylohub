interface SoundCloudWidgetProps {
  trackUrl: string;
  compact?: boolean;
}

/**
 * Renders a SoundCloud track/playlist embed.
 * Server component — no "use client" needed.
 */
export function SoundCloudWidget({ trackUrl, compact = false }: SoundCloudWidgetProps) {
  if (!trackUrl) return null;

  const params = new URLSearchParams({
    url: trackUrl,
    color: "#ff5500",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
  });

  const src = `https://w.soundcloud.com/player/?${params.toString()}`;

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{ borderRadius: "var(--profile-btn-radius, 12px)" }}
    >
      <iframe
        width="100%"
        height={compact ? "80" : "166"}
        src={src}
        title="SoundCloud player"
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
        className="border-0"
      />
    </div>
  );
}
