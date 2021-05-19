import axios from "axios";
import {ThumbDownAlt} from "@material-ui/icons";

export const RemoveLikeButton = ({
  videoId,
  setLiked,
  setError,
  setSuccessMessage,
}) => {
  const removeFromLikedVideos = async (videoId) => {
    try {
      const response = await axios.delete(
        `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
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
        setLiked(false);
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
      onClick={() => removeFromLikedVideos(videoId)}
    >
      <span>remove from liked videos</span>
      <ThumbDownAlt className="pd-left-half" />
    </button>
  );
};
