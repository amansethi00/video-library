import {createContext, useContext, useReducer} from "react";

const VideoContext = createContext();
export function VideoProvider({children}) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_LIKE":
        return {};
    }
  };
  const data = [
    {
      id: "Mus_vwhTCq0",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      playlist: [],
      channelName: "Friends",
      uploadDate: " 1 Apr 2021",
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      totalLikes: 1000,
      totalDisLikes: 200,
      channelName: "Friends",
      playlist: [],
      uploadDate: "1 Apr 2021",
    },
  ];
  const playLists = ["My Playlist"];
  const likes = ["X4pdAU3XYEM"];
  const disLikes = ["Mus_vwhTCq0"];
  const [value, dispatch] = useReducer(reducer, {
    data,
    playLists,
    likes,
    disLikes,
  });
  return (
    <VideoContext.Provider value={{value}}>{children}</VideoContext.Provider>
  );
}
export function useVideo() {
  return useContext(VideoContext);
}
