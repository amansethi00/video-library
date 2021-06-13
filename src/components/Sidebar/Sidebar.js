import React from "react";
import {SideRow} from "./SideRow";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import "./Sidebar.css";

const sideRowItems = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    title: "History",
    to: "history",
    icon: HistoryIcon,
  },
  {
    title: "Liked Videos",
    to: "likedlist",
    icon: ThumbUpAltIcon,
  },
  {
    title: "Playlists",
    to: "playlists",
    icon: VideoLibraryIcon,
  },
];
const sideRowHandler = (sideRowItems) => {
  return sideRowItems.map(({title, to, icon}, index) => (
    <SideRow title={title} to={to} Icon={icon} key={index} />
  ));
};

export const Sidebar = ({setShowSidebar}) => {
  return (
    <div
      className="card-shadow-1 sidebar-container"
      style={{
        backgroundColor: "var(--sidebar-color)",
        color: "var(--text-color)",
        minHeight: "100vh",
        width: "15rem",
      }}
    >
      <div className="nav-left mg-left-half lg pd-1">
        <span
          className="mg-left-half flex row align-items-center lg mg-bottom-1 mg-top-1"
          style={{color: "white"}}
        >
          CRUNCH <span style={{color: "var(--sidebar-hover-color"}}>TUBE</span>
        </span>
      </div>
      {sideRowHandler(sideRowItems)}
    </div>
  );
};
