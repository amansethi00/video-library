import axios from "axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
export const LikeButton = ({
  videoId,
  setLiked,
  setError,
  setSuccessMessage,
}) => {
  const addToLikedVideos = async (videoId) => {
    try {
      const response = await axios.post(
        `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
        "data",
        {
          headers: {
            Authorization: `${localStorage?.getItem(
              "username"
            )}:${localStorage.getItem("password")}`,
          },
        }
      );
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        setSuccessMessage(response.data.message);
        setLiked(true);
      }
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
      console.log({error});
    }
  };
  return (
    <button
      className="align-items-center row flex mg-right-half gray md pd-half"
      style={{
        backgroundColor: "black",
        color: "white",
      }}
      onClick={() => addToLikedVideos(videoId)}
    >
      <span>add to liked videos</span>
      <ThumbUpAltIcon className="pd-left-half" />
    </button>
  );
};
