import MenuIcon from "@material-ui/icons/Menu";
import YouTubeIcon from "@material-ui/icons/YouTube";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SearchIcon from "@material-ui/icons/Search";
import React, {useEffect} from "react";
import "./Header.css";
export function Header({setShowSidebar}) {
  return (
    <div
      className="flex header row justify-content-space-between pd-top-1"
      style={{
        height: "100%",
        backgroundColor: "var(--main-color)",
        color: "white",
      }}
    >
      <div className="nav-left  lg pd-half">
        {/* <span className="mg-left-half flex row align-items-center ">
          <YouTubeIcon fontSize={"large"} /> CrunchTube
        </span> */}

        <label className="flex row search-label">
          <input
            className="search-input"
            type="text"
            style={{color: "black"}}
            placeholder="Let's find something..."
          />
          <button>
            <MicIcon style={{color: "white"}} />
          </button>
        </label>
      </div>
      <div className="nav-right">
        <button className="btn-upload  flex row align-items-center">
          <VideocamIcon />
          <span className="pd-left-half">Upload</span>
        </button>
        <button className="btn-notification">
          <NotificationsNoneIcon fontSize={"large"} />
        </button>
        <button>
          <img
            src="https://cdn.discordapp.com/avatars/778699572787675136/bfd4785c0eb8a2be4eae7cc2fec27d34.png?size=128"
            className="avatar-modified-sm"
            alt="avatar"
          />
        </button>
      </div>
    </div>
  );
}
