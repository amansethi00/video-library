import axios from "axios";
import React, {useEffect, useState} from "react";
import {useVideo} from "../index";
import {VideoList} from "../VideoList";
import "./LikedList.css";
const LikedList = () => {
  const {
    value: {likedVideos},
    dispatch,
  } = useVideo();
  const [error, setError] = useState(null);
  useEffect(() => {
    const getLikedVideos = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/likedVideos`,
          {
            headers: {
              Authorization: `${localStorage?.getItem(
                "username"
              )}:${localStorage?.getItem("password")}`,
            },
          }
        );
        if (response.data.success) {
          console.log(response.data);
          dispatch({
            type: "SET_LIKEDVIDEOS",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log({error});
        setError(error.response.data.message);
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
      {likedVideos && <VideoList value={likedVideos} title={"Liked Videos"} />}
    </>
  );
};
export default LikedList;
