import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";
import ChannelDetails from "./components/ChannelDetails";
import SearchFeed from "./components/SearchFeed";
import VideoDetails from "./components/VideoDetails";

function App() {
  return (
    <div className="max-w-[1600px] mx-auto m-top h-[1200px]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
      </Routes>
    </div>
  );
}

export default observer(App);
