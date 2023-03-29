import { observable, action, makeObservable } from "mobx";

export default class ChannelStore {
  channelVideos = [];
  channel = {};

  constructor() {
    makeObservable(this, {
      channelVideos: observable,
      channel: observable,
      setChannel: action,
      setChannelVideos: action,
    });
  }

  setChannel(data) {
    return (this.channel = data);
  }

  setChannelVideos(data) {
    return (this.channelVideos = data);
  }
}
