import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../config/api";
import { useStores } from "../context/RootStore.context";
import { IoIosThumbsUp, IoMdPerson } from "react-icons/io";
import VideoCard from "./VideoCard";
import CommentCard from "./CommentCard";

function VideoDetails() {
  const { videoId } = useParams();
  const { store } = useStores();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchVideoDetail = fetchFromAPI(
        `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`
      );

      const fetchRelatedVideos = fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${videoId}&type=video`
      );

      const fetchVideoComments = fetchFromAPI(
        `commentThreads?part=snippet&videoId=${videoId}`
      );

      const [dataVideoDetail, dataRelatedVideos, dataVideoComments] =
        await Promise.all([
          fetchVideoDetail,
          fetchRelatedVideos,
          fetchVideoComments,
        ]);

      store.setVideoDetail(dataVideoDetail.items[0]);
      store.setRelatedVideos(dataRelatedVideos.items.slice(0, 10));
      store.setVideoComments(dataVideoComments.items.slice(0, 10));
    };
    fetchVideo();
  }, [videoId]);

  if (!store.videoDetail) return;

  const {
    videoDetail: { description, title, likeCount, viewCount, channelTitle },
    relatedVideos,
    videoComments,
  } = store;

  return (
    <div className="w-full h-fit grid grid-cols-1 grid-rows-[1fr_fit_fit] p-2">
      <div>
        {" "}
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId} `}
          controls
          width={"100%"}
          height={"500px"}
          className="h-[200px]"
        />{" "}
        <div className="w-full p-3 bg-custom-gray flex flex-col gap-4 rounded-bl-lg rounded-br-lg ">
          {" "}
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="w-full flex justify-between">
            <p className="text-xl text-black/80 flex gap-2  place-items-center">
              <IoMdPerson size={"28px"} />{" "}
              <span className="font-bold"> {channelTitle} </span>
            </p>
            <div className="flex gap-10 place-items-center">
              <p className="font-bold">
                {" "}
                {Number(viewCount).toLocaleString()}{" "}
                <span className="text-sm font-normal">views</span>
              </p>
              <p className="flex place-items-center gap-2 font-bold">
                <IoIosThumbsUp size={"24px"} />{" "}
                <span>{Number(likeCount).toLocaleString()} </span>
              </p>
            </div>
          </div>
          <div className="mt-6 text-sm text-black/60 border-b-2 pb-4">
            {description && description.slice(0, 250)}
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll grid-row row-start-2">
        <h2 className="font-bold text-xl px-2 pb-2 ">Related Videos</h2>
        <div className="w-fit  flex gap-4 ">
          {relatedVideos.map((video) => {
            return (
              <VideoCard
                video={video}
                id={video.id.videoId}
                key={video.id.videoId}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="flex px-2 items-center justify-between mt-4">
          {" "}
          <h1 className="font-bold  uppercase">Comments </h1>{" "}
          <button
            onClick={() => setOpen(!open)}
            className="bg-custom-gray-dark/20 p-2 rounded hover:bg-custom-gray-dark/30 uppercase text-sm transition-all"
          >
            {open ? "Hide" : "Show"} Comments
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 p-4 transition duration-500 ${
            open ? "opacity-1 h-[0px]" : "opacity-0 h-full"
          }`}
        >
          {open &&
            videoComments.map((com) => {
              return <CommentCard com={com} key={com.id} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default observer(VideoDetails);
