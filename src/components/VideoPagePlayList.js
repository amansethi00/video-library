import React, {useEffect, useState} from "react";
import "./VideoPage.css";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {useVideo} from "../context/video-context";
import axios from "axios";

export function VideoPagePlayList({
  showNewPlaylist,
  setShowNewPlaylist,
  showPlayList,
  setShowPlayList,
  videoId,
  setError,
}) {
  const {
    value: {playLists},
    dispatch,
  } = useVideo();
  const [newPlayList, setNewPlayList] = useState("");
  const isInPlayList = (playlist, currentVideoId) => {
    console.log({currentVideoId});
    return (
      playlist.videos.filter((prev) => prev._id === currentVideoId).length > 0
    );
  };
  const togglePlayList = async (playlist, currentVideoId) => {
    try {
      if (isInPlayList(playlist, currentVideoId) === false) {
        const response = await axios.post(
          `https://videolib.amansethi00.repl.co/playlists/${currentVideoId}`,
          {name: playlist.name},
          {
            headers: {
              Authorization: `${localStorage?.getItem(
                "username"
              )}:${localStorage?.getItem("password")}`,
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const addNewPlayList = () => {
    if (newPlayList !== "") {
      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: {name: newPlayList, videos: [videoId], id: videoId},
      });
      closePlayList();
    }
  };
  const closePlayList = () => {
    setShowPlayList(false);
    setShowNewPlaylist(false);
  };
  useEffect(() => {
    const anonymousFun = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/playlists`,
          {
            headers: {
              Authorization: `${localStorage?.getItem(
                "username"
              )}:${localStorage?.getItem("password")}`,
            },
          }
        );
        console.log("playlist get request", response.data);

        if (response.data.success) {
          dispatch({type: "SET_PLAYLISTS", payload: response.data});
        }
      } catch (error) {
        console.log("Error while loading playlists", error);
      }
    };
    anonymousFun();
  }, []);
  return (
    <div className="playlist-videopage">
      {showPlayList && (
        <>
          <div className="add-to-playlist-container"></div>
          <div className="add-to-playlist ">
            <div className="md flex row justify-content-space-between align-items-center ">
              SaveTo..
              <button
                style={{color: "var(--primary-color)"}}
                onClick={closePlayList}
              >
                <CloseIcon />
              </button>
            </div>
            <hr />
            <div style={{color: "var(--primary-color)"}}>
              {playLists.map((prev) => (
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={isInPlayList(prev, videoId)}
                    onChange={() => togglePlayList(prev, videoId)}
                  />
                  <span className="pd-left-1">{prev.name}</span>
                  <br />
                </label>
              ))}
              {showNewPlaylist === false && (
                <button
                  className="row flex align-items-center sm mg-top-half pd-0 "
                  onClick={() => setShowNewPlaylist(true)}
                  style={{color: "var(--primary-color)"}}
                >
                  <AddIcon style={{color: "var(--primary-color)"}} />
                  Create New Playlist
                </button>
              )}
              {showNewPlaylist && (
                <>
                  <div className=" mg-top-1">
                    <input
                      required
                      className="playlist-input"
                      placeholder="Enter playlist name"
                      onChange={(event) => setNewPlayList(event.target.value)}
                      style={{color: "var(--primary-color)"}}
                    />
                  </div>
                  <button
                    className="btn btn-secondary-sm mg-top-half create-button"
                    onClick={addNewPlayList}
                  >
                    Create
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
