import "./VideoPage.css";
import YouTube from "react-youtube";
import React, {useState} from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import {useVideo} from "../context/video-context.js";
export function VideoPage({video, setShowVideoPage}) {
  const [showPlayList, setShowPlayList] = useState(false);
  const {
    value: {likes, disLikes, playLists},
  } = useVideo();
  return (
    <>
      <div className="video-container">
        <YouTube
          videoId={video.id}
          className="responsive-iframe"
          opts={{
            paddingTop: "0",
            height: "390",
            width: "640",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      </div>
      <h2 className="card-head">{video.title}</h2>
      <div className="flex row gray video-actions ">
        <div>
          <span className=" sm">{video.views}</span>
          <span className=" sm">•{video.uploadDate}</span>
        </div>
        <div className="align-items-center row flex ">
          <button
            className="align-items-center row flex mg-right-half gray md"
            style={{
              color:
                likes.filter((prev) => prev === video.id).length > 0 && "black",
            }}
          >
            <ThumbUpAltIcon />
            <span>{video.totalLikes}</span>
          </button>
          <button
            className="align-items-center row flex mg-right-half gray md"
            style={{
              color:
                disLikes.filter((prev) => prev === video.id).length > 0 &&
                "black",
            }}
          >
            <ThumbDownAltIcon />
            <span>{video.totalDisLikes}</span>
          </button>
          <button
            className="align-items-center row flex mg-right-half gray md"
            onClick={() => setShowPlayList(true)}
          >
            <PlaylistAddIcon />
            <span>SAVE</span>
          </button>
        </div>
      </div>
      {showPlayList && (
        <>
          <div className="add-to-playlist-container"></div>
          <div className="add-to-playlist">
            <div className="md flex row justify-content-space-between">
              SaveTo..
              <button className="lg" onClick={() => setShowPlayList(false)}>
                X
              </button>
            </div>
            <hr />
            <label>
              <input type="checkbox" />
              My Playlist
            </label>
          </div>
        </>
      )}
    </>
  );
}
