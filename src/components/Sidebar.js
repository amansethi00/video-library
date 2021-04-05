import React from "react";
import {SideRow} from "./SideRow";
import {NavLink} from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
export function Sidebar() {
  let activeStyle = {
    textDecoration: "underline",
    backgroundColor: "red",
  };
  return (
    <div
      className="card-shadow-1"
      style={{backgroundColor: "#ffffff", minHeight: "100vh"}}
    >
      <NavLink activeStyle={activeStyle} to="/">
        <SideRow title={"Home"} Icon={HomeIcon} />
      </NavLink>
      <SideRow title={"History"} Icon={HistoryIcon} />
      <SideRow title={"Liked Videos"} Icon={ThumbUpAltIcon} />
      <NavLink activeStyle={activeStyle} to="playlists">
        <SideRow title={"Playlists"} Icon={VideoLibraryIcon} />
      </NavLink>
    </div>
  );
}
