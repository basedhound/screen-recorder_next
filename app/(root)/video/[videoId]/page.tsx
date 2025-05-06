import { redirect } from "next/navigation";
import { getVideoById } from "@/lib/actions/video";
import { VideoDetailHeader } from "@/components";

const VideoDetailsPage = async ({ params }: Params) => {
  const { videoId } = await params;

  const { user, video } = await getVideoById(videoId);
  if (!video) redirect("/404");

  return (
    <main className="wrapper page">
    <VideoDetailHeader
      title={video.title}
      createdAt={video.createdAt}
      userImg={user?.image}
      username={user?.name}
      videoId={video.videoId}
      ownerId={video.userId}
      visibility={video.visibility}
      thumbnailUrl={video.thumbnailUrl}
    />
  </main>
  );
};

export default VideoDetailsPage;