import React from "react";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {Link} from "react-router-dom";

export function PlayListCard({playlist}) {
  return (
    <Link
      to={playlist.videos.length ? `${playlist._id}` : "/playlists"}
      style={{textDecoration: "none", color: "var(--text-color)"}}
    >
      <div
        className=" relative mg-half"
        style={{
          height: "12rem",
          width: "15rem",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        <img
          className="card-image"
          style={{height: "10rem"}}
          alt="playlist-img"
          src={`https://i.ytimg.com/vi/${playlist?.videos[0]?.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLA6DxuVPYywEtlzLiVxlmx9jNpsGw`}
        />
        <h4 className="mg-top-half">{playlist.name}</h4>
        <div
          className="card-image"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            height: "10rem",
            width: "50%",
            backgroundColor: "var(--dark-gray)",
            opacity: "0.8",
          }}
        ></div>
        <div
          className="white flex column"
          style={{
            position: "absolute",
            top: "4rem",
            right: "2.5rem",
            opacity: "1",
          }}
        >
          <span>{playlist.videos.length}</span>
          <PlaylistPlayIcon />
        </div>
      </div>
    </Link>
  );
}
