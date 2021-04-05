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
  const addNewPlayList = (state, payload) => {
    return [...state.playLists.concat(payload)];
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
      case "ADD_NEW_PLAYLIST":
        return {
          ...state,
          playLists: addNewPlayList(state, payload),
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
    {
      id: "4ZmzThsytKU",
      title: "Awesome Food Compilation | Tasty Food Videos",
      views: "598,268",
      timestamp: "11 Dec 2020",
      length: "10:15",
      like: "false",
      totalLikes: 8800,
      channelName: "Foodie",
      playlist: [],
      uploadDate: "1 Apr 2021",
    },
    {
      id: "5-IHcF1WnXo",
      title: "6 Delicious Movie Night Snack Recipes",
      views: "839,508",
      timestamp: "18 Oct 2020",
      length: "8:15",
      like: "false",
      totalLikes: 15000,
      channelName: "Twisted",
      playlist: [],
      uploadDate: "1 Apr 2021",
    },
    {
      id: "oyfVyYZbOYw",
      title:
        "24 Simple Yet Delicious Breakfast Ideas || 5-Minute Breakfast Recipes",
      views: "3,258,928",
      timestamp: "18 Oct 2020",
      length: "15:53",
      like: "false",
      totalLikes: 52000,
      channelName: "5-Minute-Craft",
      playlist: [],
      uploadDate: "4 Aug 2020",
    },
    {
      id: "MuajFTgkoHw",
      title: "Quick & Simple Breakfast Recipes With Gordon Ramsay",
      views: "16,245,378",
      timestamp: "14 May 2020",
      length: "12:48",
      like: "false",
      totalLikes: 438000,
      channelName: "Gordon Ramsay",
      playlist: [],
      uploadDate: "14 May 2020",
    },
    {
      id: "X_qo3lnRS1k",
      title: "Gordon's Quick & Simple Dinner Recipes | Gordon Ramsay",
      views: "12,797,861",
      timestamp: "14 May 2020",
      length: "19:10",
      like: "false",
      totalLikes: 224000,
      channelName: "Gordon Ramsay",
      playlist: [],
      uploadDate: "11 June 2020",
    },
    {
      id: "L0AL9HdNQTg",
      title:
        "25 Delicious Food Frying Ideas || Genius Hacks For Cheese And Pizza Lovers!",
      views: "206,441",
      timestamp: "14 May 2020",
      length: "13:17",
      like: "false",
      totalLikes: 36000,
      channelName: "5-Minutes Recipes",
      playlist: [],
      uploadDate: "28 Mar 2021",
    },
    {
      id: "NH9K4_2etF8",
      title: "Top 10 Insane Breakfast Recipes",
      views: "1,233,009",
      timestamp: "25 Jul 2020",
      length: "14:43",
      like: "false",
      totalLikes: 23000,
      channelName: "Twisted",
      playlist: [],
      uploadDate: "25 Jul 2020",
    },
  ];
  const playLists = [
    {id: "X4pdAU3XYEM", name: "My Playlist", videos: ["X4pdAU3XYEM"]},
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
