import VideocamIcon from "@material-ui/icons/Videocam";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./Header.css";
import {useAuth} from "../index";
import {Link} from "react-router-dom";
import {useVideo} from "../index";
export const Header = ({setShowSidebar}) => {
  const {login} = useAuth();
  const {dispatch} = useVideo();
  const searchHandler = (event) => {
    dispatch({type: "SET_SEARCH_QUERY", payload: {query: event.target.value}});
  };
  return (
    <div
      className="flex header row justify-content-space-between pd-top-1"
      style={{
        height: "100%",
        backgroundColor: "var(--main-color)",
        color: "white",
        position: "relative",
      }}
    >
      <div className="nav-left  lg pd-half">
        <label className="flex row search-label">
          <input
            className="search-input"
            type="text"
            style={{color: "black"}}
            placeholder="Let's find something..."
            onChange={(event) => searchHandler(event)}
          />
          <button>
            <SearchIcon style={{color: "white"}} />
          </button>
        </label>
      </div>
      <div className="nav-right">
        <button className="btn-upload  flex row align-items-center">
          <VideocamIcon />
          <span className="pd-left-half">Upload</span>
        </button>

        {login && (
          <div className="flex row align-items-center">
            <button className="btn-notification">
              <NotificationsNoneIcon fontSize={"large"} />
            </button>
            <button style={{color: "white"}} className="avatar-sm">
              {localStorage.getItem("username")?.slice(0, 1).toUpperCase()}
            </button>
          </div>
        )}
        {!login && (
          <>
            <button style={{color: "white"}}>
              <Link style={{color: "white"}} to={"/login"}>
                Login
              </Link>
            </button>
            <button style={{color: "white"}}>
              <Link style={{color: "white"}} to={"/signup"}>
                Signup
              </Link>
            </button>
          </>
        )}
      </div>
      {/* <div style={{position: "absolute", right: "1.5rem", top: "3.5rem"}}>
        <button style={{color: "white"}} onClick={logoutHandler}>
          Logout
        </button>
      </div> */}
    </div>
  );
};
