interface YoutubeWidgetProps {
  videoId: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

/**
 * Renders a YouTube video embed iframe.
 * Server component — no "use client" needed.
 */
export function YoutubeWidget({
  videoId,
  autoPlay = false,
  showControls = true,
}: YoutubeWidgetProps) {
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: autoPlay ? "1" : "0",
    controls: showControls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
  });

  const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ borderRadius: "var(--profile-btn-radius, 12px)" }}>
      <div className="relative w-full aspect-video">
        <iframe
          src={src}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
