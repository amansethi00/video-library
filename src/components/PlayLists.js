import React, {useEffect} from "react";
import {useVideo} from "../context/video-context";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {PlayListCard} from "./PlayListCard";
import "./PlayLists.css";
import axios from "axios";
export const PlayLists = () => {
  const {
    value: {playLists},
    dispatch,
  } = useVideo();
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
  );
};
