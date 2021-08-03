import axios from "axios";
import React, { useEffect, useState } from "react";
import { useVideo, useAuth } from "../index";
import { VideoList } from "../VideoList";
import "./LikedList.css";
import { getAllVideosHome } from "../index";
const LikedList = () => {
  const {
    value: { likedVideos, data },
    dispatch,
  } = useVideo();
  console.log({ likedVideos })
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { login, token } = useAuth();
  useEffect(() => {
    getAllVideosHome({ data, dispatch });

    const getLikedVideos = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/likedVideos`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.success) {
          console.log(response.data);
          dispatch({
            type: "SET_LIKEDVIDEOS",
            payload: response.data,
          });
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log({ error });
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getLikedVideos();
  }, []);
  return (
    <>
      {error !== null && (
        <div className="toast-error mg-bottom-1 errorBox">
          {error}
          <button className="outline-none" onClick={() => setError(null)}>
            X{" "}
          </button>
        </div>
      )}
      {likedVideos && (
        <VideoList
          loading={loading}
          value={likedVideos}
          title={"Liked Videos"}
        />
      )}
    </>
  );
};
export default LikedList;
