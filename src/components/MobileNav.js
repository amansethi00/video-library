import React from "react";
import "./MobileNav.css";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import {NavLink} from "react-router-dom";
export function MobileNav() {
  let activeStyle = {
    textDecoration: "none",
    color: "var(--sidebar-hover-color)",
  };
  return (
    <div className="mobilenav">
      <div className="icon-container">
        <NavLink to="/" className="navstyle" activeStyle={activeStyle} end>
          {" "}
          <HomeIcon fontSize={"large"} />
        </NavLink>
        <NavLink className="navstyle" to="history" activeStyle={activeStyle}>
          <HistoryIcon fontSize={"large"} />
        </NavLink>
        <NavLink to="likedlist" className="navstyle" activeStyle={activeStyle}>
          <ThumbUpAltIcon fontSize={"large"} />
        </NavLink>
        <NavLink to="playlists" className="navstyle" activeStyle={activeStyle}>
          <VideoLibraryIcon fontSize={"large"} />
        </NavLink>
      </div>
    </div>
  );
}
