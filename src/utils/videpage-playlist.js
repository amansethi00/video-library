export const isInPlayList = (playlist, currentVideoId) => {
  return (
    playlist.videos.filter((prev) => prev._id === currentVideoId).length > 0
  );
};

export const closePlayList = ({setShowNewPlaylist, setShowPlayList}) => {
  setShowPlayList(false);
  setShowNewPlaylist(false);
};
