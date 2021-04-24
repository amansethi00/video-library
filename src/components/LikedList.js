import axios from "axios";
import React, {useEffect, useState} from "react";
import {useVideo} from "../context/video-context";
import {VideoList} from "./VideoList";
import "./LikedList.css";
export function LikedList() {
  const {
    value: {likes},
    dispatch,
  } = useVideo();
  const [error, setError] = useState(null);
  useEffect(() => {
    const anonFunc = async () => {
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
    anonFunc();
  }, []);
  return (
    <div>
      {error !== null && (
        <div className="toast-error mg-bottom-1 errorBox">
          {error}
          <button className="outline-none" onClick={() => setError(null)}>
            X{" "}
          </button>
        </div>
      )}
      {likes && <VideoList value={likes} title={"Liked Videos"} />}
    </div>
  );
}
