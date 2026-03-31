/**
 * Extracts the numeric video ID from a TikTok URL.
 * Supports: https://www.tiktok.com/@user/video/7123456789
 * Returns null if the URL doesn't match.
 */
export function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  return match ? match[1] : null;
}

export interface TwitchInfo {
  channel?: string;
  clipSlug?: string;
  isClip: boolean;
}

/**
 * Extracts Twitch channel name or clip slug from a Twitch URL.
 * Supports:
 *   https://www.twitch.tv/channelname
 *   https://www.twitch.tv/channelname/clip/ClipSlug
 *   https://clips.twitch.tv/ClipSlug
 * Returns null if the URL doesn't match.
 */
export function extractTwitchInfo(url: string): TwitchInfo | null {
  // clips.twitch.tv/SlugName
  const clipsSubdomain = url.match(/clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/);
  if (clipsSubdomain) return { clipSlug: clipsSubdomain[1], isClip: true };

  // twitch.tv/channel/clip/SlugName
  const clipPath = url.match(/twitch\.tv\/[^/]+\/clip\/([a-zA-Z0-9_-]+)/);
  if (clipPath) return { clipSlug: clipPath[1], isClip: true };

  // twitch.tv/channelname
  const channel = url.match(/twitch\.tv\/([a-zA-Z0-9_]{1,25})(?:\/|$|\?)/);
  if (channel) return { channel: channel[1], isClip: false };

  return null;
}

/**
 * Validates a SoundCloud track URL and returns it if valid.
 * Returns null if the URL doesn't start with soundcloud.com.
 */
export function extractSoundCloudUrl(url: string): string | null {
  return /^https?:\/\/soundcloud\.com\/\S+/.test(url) ? url : null;
}

/**
 * Extracts the numeric tweet ID from a Twitter or X URL.
 * Supports:
 *   https://twitter.com/user/status/1234567890
 *   https://x.com/user/status/1234567890
 * Returns null if the URL doesn't match.
 */
export function extractTweetId(url: string): string | null {
  const match = url.match(/(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/);
  return match ? match[1] : null;
}
