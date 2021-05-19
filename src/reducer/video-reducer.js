import {
  addNewPlayList,
  addToLikes,
  addToWatchedVideos,
  addToPlayList,
  isLiked,
  removeFromLikes,
  removeFromPlayList,
  increaseLikes,
  decreaseLikes,
} from "../utils/video-context";
export const reducer = (state, {type, payload}) => {
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
        likedVideos: payload.likedVideos,
      };
    case "SET_WATCHEDVIDEOS":
      return {
        ...state,
        watchedVideos: payload.watchedVideos,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playLists: payload.playlists,
      };
    case "TOGGLE_LIKE":
      console.log(state);
      return isLiked(state, payload)
        ? {
            ...state,
            likedVideos: removeFromLikes(state, payload),
            data: decreaseLikes(state, payload),
          }
        : {
            ...state,
            data: increaseLikes(state, payload),
            likedVideos: addToLikes(state, payload),
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
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: payload.query,
      };
    default:
      return {...state};
  }
};
