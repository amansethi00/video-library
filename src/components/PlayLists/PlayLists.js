import React, {useEffect, useState} from "react";
import {useVideo, useAuth} from "../index";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {PlayListCard} from "./PlayListCard";
import "./PlayLists.css";
import axios from "axios";
import Loader from "react-loader-spinner";

const PlayLists = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {login, token} = useAuth();
  const {
    value: {playLists},
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
          dispatch({type: "SET_PLAYLISTS", payload: response.data});
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
      {loading && (
        <Loader center type="Puff" color="#00BFFF" height={100} width={100} />
      )}
      <div className="playlist pd-right -2">
        <div className="row flex align-items-center">
          <span>
            <PlaylistPlayIcon />
          </span>
          <h2 className="mg-left-half">Playlists</h2>
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
