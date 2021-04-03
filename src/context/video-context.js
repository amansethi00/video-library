import {createContext, useContext, useReducer} from "react";

const VideoContext = createContext();
export function VideoProvider({children}) {
  const reducer = ({type, payload}) => {};
  const data = [
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      playlist: [],
    },
    {
      id: "X4pdAU3XYEM",
      title: "Friends the one with Phoebe's wedding",
      views: "1M",
      timestamp: "20 days ago",
      length: "1:38",
      like: "false",
      channelName: "Friends",
      playlist: [],
    },
  ];
  const [value, dispatch] = useReducer(reducer, data);
  return (
    <VideoContext.Provider value={{value}}>{children}</VideoContext.Provider>
  );
}
export function useVideo() {
  return useContext(VideoContext);
}
