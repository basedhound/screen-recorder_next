import {SharedHeader, VideoCard } from "@/components";

const page = async () => {

  return (
    <main className="wrapper page">
      <SharedHeader subHeader="Public Library" title="All Videos" />
      <section className="video-grid">
            <VideoCard
              id="0a535322-a71e-483e-89e7-ec846fe4b893"
              title="Sample Video"
              thumbnail="/assets/images/video1.png"
              createdAt="2025-05-01 06:25:54.437"
              userImg="/assets/images/jason.png"
              username="Jason"
              views={10}
              reactions={[{"emoji":"👍","userId":"ijVVLbmzXzQP1V0PNp8YJE2WNg1SoPBT"},{"emoji":"😍","userId":"KcsQDEpFy50xApAZyvP2BaI0RU5ltT4S"}]}
              visibility="public"
              duration={154}
            />
      </section>
    </main>
  );
};

export default page;
