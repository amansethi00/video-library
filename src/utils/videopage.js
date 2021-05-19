import axios from "axios";
export const getVideoPage = async ({setVideo, newVideoId}) => {
  try {
    const response = await axios.get(
      `https://videolib.amansethi00.repl.co/videos/${newVideoId}`
    );
    setVideo(response.data.video);
  } catch (error) {
    console.log({error});
  }
};

export const isLikedVideo = async ({setLiked, setError, videoId}) => {
  if (localStorage.getItem("isLogin")) {
    try {
      const response = await axios.get(
        `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
        {
          headers: {
            Authorization: `${localStorage?.getItem(
              "username"
            )}:${localStorage?.getItem("password")}`,
          },
        }
      );
      if (response.data.success) {
        setLiked(response.data.inLikedVideos);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }
};

export const addToWatchedVideos = async ({newVideoId}) => {
  try {
    const response = await axios.post(
      `https://videolib.amansethi00.repl.co/watchedVideos/${newVideoId}`,
      "some",
      {
        headers: {
          Authorization: `${localStorage?.getItem(
            "username"
          )}:${localStorage?.getItem("password")}`,
        },
      }
    );
  } catch (error) {
    console.error("user not logged in,SOME FEATURES ARE NOT AVAILABLE");
  }
};

export const playlistHandler = ({setShowPlayList, setError, login}) => {
  if (login) {
    setShowPlayList(true);
  } else {
    setError("Please login to perform this action");
  }
};
