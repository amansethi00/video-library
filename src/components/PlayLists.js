import React from "react";
import {useVideo} from "../context/video-context";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {PlayListCard} from "./PlayListCard";
import "./PlayLists.css";
import {Link} from "react-router-dom";
export function PlayLists() {
  const {
    value: {playLists},
  } = useVideo();
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
}
