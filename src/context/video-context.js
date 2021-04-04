import {createContext, useContext, useReducer} from "react";

const VideoContext = createContext();
export function VideoProvider({children}) {
  const isLiked = (state, payload) => {
    console.log(state);
    return state.likes.filter((prev) => prev === payload.id).length > 0;
  };
  const addToLikes = (state, payload) => {
    return isLiked(state, payload)
      ? state.likes
      : state.likes.concat(payload.id);
  };

  const removeFromLikes = (state, payload) => {
    return state.likes.filter((prev) => prev !== payload.id);
  };
  const increaseLikes = (state, payload) => {
    return isLiked(state, payload)
      ? [...state.data]
      : state.data.map((prev) =>
          prev.id === payload.id
            ? {...prev, totalLikes: prev.totalLikes + 1}
            : prev
        );
  };

  const decreaseLikes = (state, payload) => {
    return state.data.map((prev) =>
      prev.id === payload.id ? {...prev, totalLikes: prev.totalLikes - 1} : prev
    );
  };
  const addToPlayList = (state, payload) => {
    return state.playLists.map((prev) =>
      prev.name === payload.playList.name
        ? {...prev, videos: prev.videos.concat(payload.videoId)}
        : prev
    );
  };
  const removeFromPlayList = (state, payload) => {
    return state.playLists.map((prev) =>
      prev.name === payload.playList.name
        ? {
            ...prev,
            videos: prev.videos.filter(
              (storedId) => storedId !== payload.videoId
            ),
          }
        : prev
    );
  };
  const reducer = (state, {type, payload}) => {
    switch (type) {
      case "TOGGLE_LIKE":
        console.log(state);
        return isLiked(state, payload)
          ? {
              ...state,
              likes: removeFromLikes(state, payload),
              data: decreaseLikes(state, payload),
            }
          : {
              ...state,
              data: increaseLikes(state, payload),
              likes: addToLikes(state, payload),
            };
      case "ADD_TO_PLAYLIST":
        return {
          ...state,
          playLists: addToPlayList(state, payload),
        };
      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playLists: removeFromPlayList(state, payload),
        };
      default:
        return {...state};
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
      channelName: "Friends",
      playlist: [],
      uploadDate: "1 Apr 2021",
    },
  ];
  const playLists = [
    {name: "My Playlist", videos: ["X4pdAU3XYEM"]},
    {name: "new playlist", videos: []},
  ];
  const likes = ["X4pdAU3XYEM"];
  const [value, dispatch] = useReducer(reducer, {
    data,
    playLists,
    likes,
  });
  console.log(value);
  return (
    <VideoContext.Provider value={{value, dispatch}}>
      {children}
    </VideoContext.Provider>
  );
}
export function useVideo() {
  return useContext(VideoContext);
}
