import { useEffect } from "react";
import { fetchFromAPI } from "../config/api";
import CategoryCard from "./CategoryCard";
import { categories } from "../config/config";
import { observer } from "mobx-react";
import { useStores } from "../context/RootStore.context";
import VideoCard from "./VideoCard";

function Feed() {
  const { store } = useStores();

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchFromAPI(
        `search?part=snippet&q=${store.category}`
      );

      store.setVideos(data.items);
    };
    fetchVideos();
  }, [store.category]);

  return (
    <div className="w-full h-full grid  grid-rows-[fit_1fr] lg:grid-rows-1 grid-cols-1   lg:grid-cols-[1fr_2.5fr] xl:grid-cols-[1fr_3fr]">
      <div className="w-full  flex overflow-x-scroll lg:flex-col border-r-4 border-l-4">
        {categories.map((category) => {
          return (
            <CategoryCard
              icon={category.icon}
              name={category.name}
              key={category.name}
            />
          );
        })}
      </div>
      <div className=" w-full bg-custom-gray overflow-y-scroll ">
        <h1
          className="text-3xl sm:text-4xl l  font-bold  px-9 bg-white py-6 w-full"
          key={store.category}
        >
          {store.category}
        </h1>

        <div className="grid  grid-cols-1   md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-2 place-items-center">
          {store.videos.map((video) => {
            return <VideoCard video={video} key={video.id?.videoId} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default observer(Feed);
