const isLiked = (state, payload) => {
  console.log(state);
  return state.likedVideos.filter((prev) => prev === payload.id).length > 0;
};
const addToLikes = (state, payload) => {
  return isLiked(state, payload)
    ? state.likedVideos
    : state.likedVideos.concat(payload.id);
};

const removeFromLikes = (state, payload) => {
  return state.likedVideos.filter((prev) => prev !== payload.id);
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
const setWatchedVideos = (state, payload) => {
  return isInWatchedVideos(state, payload)
    ? state.watchedVideos
    : state.watchedVideos.concat(payload.videoId);
};

export {
  addNewPlayList,
  addToLikes,
  setWatchedVideos,
  addToPlayList,
  isInWatchedVideos,
  isLiked,
  removeFromLikes,
  removeFromPlayList,
  increaseLikes,
  decreaseLikes,
};
