export const getPlayListFirstVideo = (playLists, playlistid) => {
  return playLists.filter((prev) => prev._id === playlistid)[0]?.videos[0]._id;
};
export const getAllVideos = (playLists, playlistid) => {
  return playLists.filter((prev) => prev._id === playlistid)[0]?.videos;
};
