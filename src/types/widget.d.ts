export type WidgetType =
  | "LINK"
  | "YOUTUBE"       // was "VIDEO" — fixed to match backend enum
  | "SPOTIFY"
  | "IMAGE"
  | "LEAD_FORM"
  | "TEXT"
  | "TIKTOK"
  | "TWITCH"
  | "SOUNDCLOUD"
  | "TWITTER";

export interface Widget {
  id: string;
  type: WidgetType;
  orderIndex: number;
  isActive: boolean;
  config: WidgetConfig;
}

export interface WidgetConfig {
  // LINK
  title?: string;
  url?: string;
  // YOUTUBE
  videoId?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  // SPOTIFY
  spotifyUri?: string;
  compact?: boolean;
  // IMAGE
  imageUrl?: string;
  altText?: string;
  linkUrl?: string;
  // LEAD_FORM
  content?: string;
  buttonLabel?: string;
  successMessage?: string;
  formFields?: string[];
  // TEXT
  text?: string;
  // TWITCH
  channel?: string;
  clipSlug?: string;
  isClip?: boolean;
  // SOUNDCLOUD
  trackUrl?: string;
  // TWITTER
  tweetId?: string;
}

export interface AddWidgetRequest {
  type: WidgetType;
  order: number;
  title?: string;
  url?: string;
  videoId?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  spotifyUri?: string;
  compact?: boolean;
  imageUrl?: string;
  altText?: string;
  linkUrl?: string;
  content?: string;
  buttonLabel?: string;
  successMessage?: string;
  formFields?: string[];
  text?: string;
  twitchChannel?: string;
  twitchClipSlug?: string;
  twitterTweetId?: string;
}

export interface UpdateWidgetRequest extends Omit<AddWidgetRequest, "type" | "order"> {}

export interface ReorderWidgetsRequest {
  orderedWidgetIds: string[];
}
