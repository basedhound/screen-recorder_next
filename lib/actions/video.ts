"use server";

import { db } from "@/drizzle/db";
import { videos, user } from "@/drizzle/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

import {
  BUNNY_CDN_URL,
  BUNNY_EMBED_URL,
  BUNNY_STORAGE_BASE_URL,
  BUNNY_STREAM_BASE_URL,
  // BUNNY_TRANSCRIPT_URL,
} from "@/constants";

import { apiFetch, getEnv, withErrorHandling } from "../utils";

//get session
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;

  return session;
};

//revalidate
const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

export const getVideoUploadUrl = withErrorHandling(async () => {
  await getSession();
  const libraryId = getEnv("BUNNY_LIBRARY_ID");

  const videoData = await apiFetch<BunnyVideoResponse>(
    `${BUNNY_STREAM_BASE_URL}/${libraryId}/videos`,
    {
      method: "POST",
      bunnyType: "stream",
      body: { title: "Temp Title", collectionId: "" },
    }
  );

  return {
    videoId: videoData.guid,
    uploadUrl: `${BUNNY_STREAM_BASE_URL}/${libraryId}/videos/${videoData.guid}`,
    accessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    const thumbnailFileName = `${Date.now()}-${videoId}-thumbnail`;

    return {
      uploadUrl: `${BUNNY_STORAGE_BASE_URL}/thumbnails/${thumbnailFileName}`,
      cdnUrl: `${BUNNY_CDN_URL}/thumbnails/${thumbnailFileName}`,
      accessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
    };
  }
);

export const saveVideoDetails = withErrorHandling(
  async (data: VideoDetails) => {
    const session = await getSession();
    const userId = session?.user.id;

    const libraryId = getEnv("BUNNY_LIBRARY_ID");

    await apiFetch(
      `${BUNNY_STREAM_BASE_URL}/${libraryId}/videos/${data.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: data.title,
          description: data.description,
        },
      }
    );

    const videoUrl = `${BUNNY_EMBED_URL}/${libraryId}/${data.videoId}`;
    const now = new Date();

    await db.insert(videos).values({
      ...data,
      videoUrl,
      userId: userId!,
      createdAt: now,
      updatedAt: now,
      duration: data.duration, // Add the duration field
    });

    revalidatePath("/");

    return { videoId: data.videoId };
  }
);
