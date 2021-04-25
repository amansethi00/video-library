import React, {useEffect, useState} from "react";
import {useVideo} from "../context/video-context";
import {VideoList} from "./VideoList";
import axios from "axios";
export const WatchedVideosList = () => {
  const {
    value: {watchedVideos},
    dispatch,
  } = useVideo();
  const [error, setError] = useState(null);
  console.log(watchedVideos);

  useEffect(() => {
    const anonFunc = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/watchedVideos`,
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
            type: "SET_WATCHEDVIDEOS",
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
    <>
      {error !== null && (
        <div className="toast-error mg-bottom-1 errorBox">
          {error}
          <button className="outline-none" onClick={() => setError(null)}>
            X{" "}
          </button>
        </div>
      )}
      <VideoList value={watchedVideos} title={"Watched Videos"} />
    </>
  );
};
