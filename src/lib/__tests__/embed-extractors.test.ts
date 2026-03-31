import { describe, it, expect } from "vitest";
import {
  extractTikTokVideoId,
  extractTwitchInfo,
  extractSoundCloudUrl,
  extractTweetId,
} from "../embed-extractors";

describe("extractTikTokVideoId", () => {
  it("extracts ID from standard TikTok URL", () => {
    expect(extractTikTokVideoId("https://www.tiktok.com/@user123/video/7123456789012345678"))
      .toBe("7123456789012345678");
  });
  it("returns null for non-TikTok URL", () => {
    expect(extractTikTokVideoId("https://youtube.com/watch?v=abc")).toBeNull();
  });
  it("returns null for empty string", () => {
    expect(extractTikTokVideoId("")).toBeNull();
  });
});

describe("extractTwitchInfo", () => {
  it("extracts channel name from twitch.tv URL", () => {
    expect(extractTwitchInfo("https://www.twitch.tv/shroud"))
      .toEqual({ channel: "shroud", isClip: false });
  });
  it("extracts clip slug from clips.twitch.tv URL", () => {
    expect(extractTwitchInfo("https://clips.twitch.tv/GleamingFastWitchTriHard"))
      .toEqual({ clipSlug: "GleamingFastWitchTriHard", isClip: true });
  });
  it("extracts clip slug from twitch.tv/channel/clip/slug", () => {
    expect(extractTwitchInfo("https://www.twitch.tv/shroud/clip/GleamingFastWitchTriHard"))
      .toEqual({ clipSlug: "GleamingFastWitchTriHard", isClip: true });
  });
  it("returns null for non-Twitch URL", () => {
    expect(extractTwitchInfo("https://youtube.com/abc")).toBeNull();
  });
});

describe("extractSoundCloudUrl", () => {
  it("returns the URL if it is a valid SoundCloud URL", () => {
    const url = "https://soundcloud.com/artist/track-name";
    expect(extractSoundCloudUrl(url)).toBe(url);
  });
  it("returns null for non-SoundCloud URL", () => {
    expect(extractSoundCloudUrl("https://spotify.com/track/abc")).toBeNull();
  });
});

describe("extractTweetId", () => {
  it("extracts ID from twitter.com URL", () => {
    expect(extractTweetId("https://twitter.com/user/status/1234567890123456789"))
      .toBe("1234567890123456789");
  });
  it("extracts ID from x.com URL", () => {
    expect(extractTweetId("https://x.com/user/status/1234567890123456789"))
      .toBe("1234567890123456789");
  });
  it("returns null for non-Twitter URL", () => {
    expect(extractTweetId("https://instagram.com/p/abc")).toBeNull();
  });
});
