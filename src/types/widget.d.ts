export type WidgetType =
  | "LINK"
  | "VIDEO"
  | "SPOTIFY"
  | "IMAGE"
  | "LEAD_FORM"
  | "TEXT";

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
  // VIDEO (YouTube)
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
  // FORM (lead capture)
  content?: string;
  buttonLabel?: string;
  successMessage?: string;
  formFields?: string[];
  // TEXT
  text?: string;
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
}

export interface UpdateWidgetRequest extends Omit<AddWidgetRequest, "type" | "order"> {}

export interface ReorderWidgetsRequest {
  orderedWidgetIds: string[];
}
