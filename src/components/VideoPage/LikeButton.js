import axios from "axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useAuth } from "../index";
export const LikeButton = ({
  videoId,
  setLiked,
  setError,
  setSuccessMessage,
}) => {
  const { login, token } = useAuth();
  const addToLikedVideos = async (videoId) => {
    if (login) {
      try {
        const response = await axios.post(
          `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
          "data",
          {
            headers: {
              Authorization: token,
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
        console.log({ error });
      }
    } else {
      setError("please login and try again");
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
      <span>LIKE</span>
      <ThumbUpAltIcon className="pd-left-half" />
    </button>
  );
};
