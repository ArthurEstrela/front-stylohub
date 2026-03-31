interface TwitchWidgetProps {
  channel?: string;
  clipSlug?: string;
  isClip: boolean;
}

/**
 * Renders a Twitch channel or clip embed.
 * The `parent` parameter is required by Twitch — reads from NEXT_PUBLIC_DOMAIN env var.
 * Server component — no "use client" needed.
 */
export function TwitchWidget({ channel, clipSlug, isClip }: TwitchWidgetProps) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? "localhost";

  const src = isClip
    ? `https://clips.twitch.tv/embed?clip=${clipSlug}&parent=${domain}`
    : `https://player.twitch.tv/?channel=${channel}&parent=${domain}`;

  const label = isClip ? "Twitch clip" : `Twitch: ${channel}`;

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{ borderRadius: "var(--profile-btn-radius, 12px)" }}
    >
      <div className="relative w-full aspect-video">
        <iframe
          src={src}
          title={label}
          allow="autoplay; encrypted-media"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
