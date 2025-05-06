import { redirect } from "next/navigation";
import { getVideoById } from "@/lib/actions/video";

const VideoDetails = async ({ params }: Params) => {
  const { videoId } = await params;

  const { user, video } = await getVideoById(videoId);
  if (!video) redirect("/404");

  return (
    <div>
	    Video Details Page
	  </div>
  );
};

export default VideoDetails;