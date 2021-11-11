export const getPlayListFirstVideo = (playLists, playlistid) => {
  console.log(
    "first playlist video from util",
    playLists.find((prev) => prev._id === playlistid)?.videos[0]
  );
  return playLists.find((prev) => prev._id === playlistid)?.videos[0]._id;
};
export const getAllVideos = (playLists, playlistid) => {
  return playLists.find((prev) => prev._id === playlistid)?.videos;
};
