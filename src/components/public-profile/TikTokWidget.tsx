interface TikTokWidgetProps {
  videoId: string;
}

/**
 * Renders a TikTok video embed (9:16 aspect ratio).
 * Server component — no "use client" needed.
 */
export function TikTokWidget({ videoId }: TikTokWidgetProps) {
  if (!videoId) return null;

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{ borderRadius: "var(--profile-btn-radius, 12px)" }}
    >
      {/* 9:16 aspect ratio for vertical TikTok videos */}
      <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title="TikTok video"
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
