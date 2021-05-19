import React, {useEffect, useState} from "react";
import {useVideo} from "../index";
import {VideoList} from "../VideoList";
import axios from "axios";
export const WatchedList = () => {
  const {
    value: {watchedVideos},
    dispatch,
  } = useVideo();
  const [error, setError] = useState(null);
  const getAndSetWatchedVideos = async () => {
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
        dispatch({
          type: "SET_WATCHEDVIDEOS",
          payload: response.data,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    getAndSetWatchedVideos();
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
