import React, { useEffect, useState } from "react";
import { useVideo, useAuth, getAllVideosHome } from "../index";
import { VideoList } from "../VideoList";
import axios from "axios";
const WatchedList = () => {
  const {
    value: { data, watchedVideos },
    dispatch,
  } = useVideo();
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const getAndSetWatchedVideos = async () => {
    try {
      const response = await axios.get(
        `https://videolib.amansethi00.repl.co/watchedVideos`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "SET_WATCHEDVIDEOS",
          payload: response.data,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log({ token }, { error });
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllVideosHome({ data, dispatch });

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
      <VideoList
        loading={loading}
        value={watchedVideos}
        title={"Watched Videos"}
      />
    </>
  );
};
export default WatchedList;
