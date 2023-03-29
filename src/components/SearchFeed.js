import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../config/api";
import { useStores } from "../context/RootStore.context";
import VideoCard from "./VideoCard";

function SearchFeed() {
  const { searchTerm } = useParams();
  const { store } = useStores();
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);

      store.setSearchVideos(data.items);
    };
    fetchVideos();
  }, [searchTerm]);

  return (
    <div className="w-full h-full bg-custom-gray">
      <h3 className="p-5 text-xl text-gray-700">
        Search results for{" "}
        <span className="font-bold text-black text-2xl">"{searchTerm}"</span>{" "}
      </h3>
      <div className="w-full h-full  bg-white grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10 p-4 place-items-center">
        {store.searchVideos.map((video) => {
          return <VideoCard key={video.id.videoId} video={video} />;
        })}
      </div>
    </div>
  );
}

export default observer(SearchFeed);
