export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY_STREAM_BASE_URL = "https://video.bunnycdn.com/library";
export const BUNNY_STORAGE_BASE_URL =
  "https://sg.storage.bunnycdn.com/snapcast";
export const BUNNY_CDN_URL = "https://snapcast.b-cdn.net";
export const BUNNY_EMBED_URL = "https://iframe.mediadelivery.net/embed";
export const BUNNY_TRANSCRIPT_URL = "https://vz-47a08e64-84d.b-cdn.net";

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
  "Most Viewed",
  "Most Recent",
  "Oldest First",
  "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
};

export const reactionCounts = {
  "😂": 0,
  "😍": 0,
  "👍": 0,
};

export const infos = ["transcript", "metadata"];
