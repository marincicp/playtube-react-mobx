import VideoStore from "./store";
import ChannelStore from "./ChannelStore";

class RootStore {
  store;
  channelStore;

  constructor() {
    this.store = new VideoStore();
    this.channelStore = new ChannelStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
