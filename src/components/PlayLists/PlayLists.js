import React, { useEffect, useState } from "react";
import { useVideo, useAuth, getAllVideosHome } from "../index";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { PlayListCard } from "./PlayListCard";
import "./PlayLists.css";
import axios from "axios";
import Loader from "react-loader-spinner";

const PlayLists = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login, token } = useAuth();
  const {
    value: { data, playLists },
    dispatch,
  } = useVideo();
  const getAllPlaylists = async (setLoading, setError) => {
    if (login) {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/playlists`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.success) {
          dispatch({ type: "SET_PLAYLISTS", payload: response.data });
        }
      } catch (error) {
        console.log("Error while loading playlists", error);
        setError(error.response.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please login and try again");
    }
  };
  useEffect(() => {
    getAllVideosHome({ data, dispatch });

    getAllPlaylists(setLoading, setError);
  }, []);

  return (
    <>
      {error !== null && (
        <div className="alert-red sm align-items-center">
          <div className="alert-text">{error}</div>
          <button className="alert-image sm" onClick={() => setError("")}>
            X
          </button>
        </div>
      )}

      <div className="playlist pd-right -2">
        <div className="row flex align-items-center">
          <h2 className="mg-left-half">PLAYLISTS</h2>
          {loading && (
            <Loader
              style={{ paddingLeft: "0.5rem" }}
              type="Grid"
              color="#00BFFF"
              height={30}
              width={20}
            />
          )}
        </div>
        <div className="flex row ">
          {playLists.map((playlist) => {
            return <PlayListCard playlist={playlist} />;
          })}
        </div>
      </div>
    </>
  );
};

export default PlayLists;
