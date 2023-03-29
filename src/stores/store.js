import { observable, action, makeObservable } from "mobx";

export default class VideoStore {
  category = "Music";
  videos = [];
  searchVideos = [];
  relatedVideos = [];
  videoDetail = {};
  videoComments = [];

  searchQuery = "";

  constructor() {
    makeObservable(this, {
      category: observable,
      videos: observable,
      relatedVideos: observable,
      videoDetail: observable,
      videoComments: observable,
      setCategory: action,
      setVideos: action,
      setSearchQuery: action,
      setSearchVideos: action,
      setVideoDetail: action,
      setRelatedVideos: action,
      setVideoComments: action,
    });
  }

  setCategory(newCat) {
    return (this.category = newCat);
  }

  setVideos(data) {
    return (this.videos = data);
  }

  setSearchQuery(query) {
    return (this.searchQuery = query);
  }

  setSearchVideos(videos) {
    return (this.searchVideos = videos);
  }

  setVideoDetail(video) {
    const {
      id,
      snippet: { title, description, channelTitle },
      statistics: { viewCount, likeCount },
    } = video;

    return (this.videoDetail = {
      id,
      title,
      description,
      viewCount,
      likeCount,
      channelTitle,
    });
  }

  setRelatedVideos(videos) {
    return (this.relatedVideos = videos);
  }

  setVideoComments(comments) {
    return (this.videoComments = comments);
  }
}
