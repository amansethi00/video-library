import React from "react";
import {SideRow} from "./SideRow";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
export function Sidebar() {
  return (
    <div
      className="card-shadow-1"
      style={{backgroundColor: "#ffffff", minHeight: "100vh"}}
    >
      <SideRow title={"Home"} Icon={HomeIcon} selected={true} />
      <SideRow title={"History"} Icon={HistoryIcon} />
      <SideRow title={"Liked Videos"} Icon={ThumbUpAltIcon} />
      <SideRow title={"Heelloo"} Icon={VideoLibraryIcon} />
    </div>
  );
}
