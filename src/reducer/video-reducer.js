export const reducer = (state, {type, payload}) => {
  switch (type) {
    case "SET_DATA":
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
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: payload.query,
      };
    default:
      return {...state};
  }
};
