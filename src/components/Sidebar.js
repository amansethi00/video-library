import React from "react";
import {SideRow} from "./SideRow";
import {NavLink} from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import MenuIcon from "@material-ui/icons/Menu";
import YouTubeIcon from "@material-ui/icons/YouTube";
export function Sidebar({setShowSidebar}) {
  let activeStyle = {
    textDecoration: "underline",
    backgroundColor: "red",
  };
  return (
    <div
      className="card-shadow-1 "
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        width: "15rem",
        transform: "translate3d(0, 0, 0)",
        transitionDuration: "200ms",
      }}
    >
      <div className="nav-left mg-left-half lg pd-1">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <MenuIcon />
        </button>
        <span className="mg-left-half flex row align-items-center">
          <YouTubeIcon fontSize={"large"} /> CrunchTube
        </span>
      </div>
      <NavLink activeStyle={activeStyle} to="/">
        <SideRow title={"Home"} Icon={HomeIcon} />
      </NavLink>
      <NavLink to="history">
        <SideRow title={"History"} Icon={HistoryIcon} />
      </NavLink>
      <NavLink to="likedlist">
        <SideRow title={"Liked Videos"} Icon={ThumbUpAltIcon} />
      </NavLink>
      <NavLink activeStyle={activeStyle} to="playlists">
        <SideRow title={"Playlists"} Icon={VideoLibraryIcon} />
      </NavLink>
    </div>
  );
}
