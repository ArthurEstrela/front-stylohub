import { Tweet } from "react-tweet";

interface TwitterWidgetProps {
  tweetId: string;
}

/**
 * Renders a Twitter/X post using react-tweet (server-side, no Twitter JS SDK).
 * Server component — no "use client" needed.
 */
export function TwitterWidget({ tweetId }: TwitterWidgetProps) {
  if (!tweetId) return null;

  return (
    <div className="w-full flex justify-center">
      <Tweet id={tweetId} />
    </div>
  );
}
