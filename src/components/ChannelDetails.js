import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../config/api";
import { useStores } from "../context/RootStore.context";
import VideoCard from "./VideoCard";

function ChannelDetails() {
  const { id } = useParams();
  const { channelStore } = useStores();

  useEffect(() => {
    const fetchChannel = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      channelStore.setChannel(data?.items[0]);

      const channelVideos = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      channelStore.setChannelVideos(channelVideos.items);
    };

    fetchChannel();
  }, []);

  const numOfSubs = (num = 1) => {
    return Number(num).toLocaleString() + " subscribers";
  };

  const {
    channelVideos,
    channel: { brandingSettings, snippet, statistics },
  } = channelStore;

  return (
    <>
      <div className="bg-custom-gray w-full h-full">
        <div className="w-full h-[300px]  mx-auto border-b-2">
          <img
            className="w-full h-full object-cover"
            src={brandingSettings?.image.bannerExternalUrl}
            alt={snippet?.title}
          />
        </div>
        <div className="w-full md:w-[80%] h-fit mx-auto grid md:grid-cols-[1fr_2.5fr] py-8 ">
          <div className="flex items-center justify-center p-2">
            <img
              className="rounded-full w-[40%] sm:w-[30%]  md:w-[80%] xl:w-[65%] shadow-lg shadow-black/50"
              src={snippet?.thumbnails.high.url}
              alt={snippet?.title}
            />
          </div>
          <div className="py-8 px-10 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">{snippet?.title}</h2>
            <p className="my-2 text-base font-bold text-custom-gray-dark">
              {numOfSubs(statistics?.subscriberCount)}
            </p>
            <p className="text-base text-custom-gray-dark text-center">
              {" "}
              {snippet?.description.slice(0, 300)}...
            </p>
          </div>
        </div>
        <div className="w-full border-t-2 px-3 pt-3 flex items-center">
          <h2 className="font-bold md:text-xl" key={snippet?.title}>
            <span className="text-2xl md:text-3xl font-bold text-gradient-1">
              {snippet?.title}
            </span>
            's videos
          </h2>
        </div>

        <div className="w-full h-fit py-3 bg-white grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 px-5  place-items-center ">
          {channelVideos?.map((video) => {
            return <VideoCard id={id} key={video.id.videoId} video={video} />;
          })}
        </div>
      </div>{" "}
    </>
  );
}

export default observer(ChannelDetails);
