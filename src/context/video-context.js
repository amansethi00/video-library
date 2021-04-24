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
  const isInWatchedVideos = (state, payload) => {
    console.log("payload isInWatchedVideos", payload);
    return (
      state.watchedVideos.filter((prev) => prev === payload.videoId).length > 0
    );
  };
  const addToWatchedVideos = (state, payload) => {
    return isInWatchedVideos(state, payload)
      ? state.watchedVideos
      : state.watchedVideos.concat(payload.videoId);
  };
  const reducer = (state, {type, payload}) => {
    switch (type) {
      case "SET_DATA":
        console.log(payload.data);
        return {
          ...state,
          data: payload.data,
        };
      case "SET_LIKEDVIDEOS":
        return {
          ...state,
          likes: payload.likedVideos,
        };
      case "SET_WATCHEDVIDEOS":
        return {
          ...state,
          watchedVideos: payload.watchedVideos,
        };
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
      case "ADD_TO_WATCHED_VIDEOS":
        return {
          ...state,
          watchedVideos: addToWatchedVideos(state, payload),
        };
      default:
        return {...state};
    }
  };
  const data = [];
  const playLists = [
    {id: "4ZmzThsytKU", name: "My Playlist", videos: ["4ZmzThsytKU"]},
  ];
  const likes = [];
  const watchedVideos = ["4ZmzThsytKU"];
  const [value, dispatch] = useReducer(reducer, {
    data,
    playLists,
    likes,
    watchedVideos,
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
