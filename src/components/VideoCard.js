import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

function VideoCard({ video, id }) {
  const cutTitle = (str) => {
    if (str.length > 20) {
      return str.slice(0, 40) + "...";
    } else return str;
  };

  return (
    <div className="w-full h-[300px]  xsm:w-[358px] md:w-[320px] xl:w-[300px] bg-gray-light rounded group cursor-pointer overflow-hidden shadow-xl shadow-black/10">
      <Link to={`/video/${video.id?.videoId}`}>
        <div className="relative w-full h-[60%] overflow-hidden">
          <img
            className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300 ease-in"
            src={video.snippet?.thumbnails.medium.url}
            alt={video.snippet?.title}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        </div>
      </Link>

      <div className="w-full h-[40%] p-2 text-custom-gray font-bold ">
        <Link to={`/video/${video.id?.videoId}`}>
          <p className="leading-5">{cutTitle(video.snippet?.title)}</p>
        </Link>
        {!id ? (
          <Link to={`/channel/${video.snippet?.channelId}`}>
            <p className="uppercase text-sm text-gray-800 mt-2 py-2 flex place-items-center gap-2">
              <span className="bg-gray-400 p-2 rounded-full">
                <IoMdPerson />{" "}
              </span>{" "}
              {video.snippet?.channelTitle}
            </p>
          </Link>
        ) : (
          <p className="uppercase text-sm text-gray-800 mt-2 py-2 flex place-items-center gap-2">
            <span className="bg-gray-400 p-2 rounded-full">
              <IoMdPerson />{" "}
            </span>{" "}
            {video.snippet?.channelTitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default observer(VideoCard);
