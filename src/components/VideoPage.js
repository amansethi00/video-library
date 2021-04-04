import "./VideoPage.css";
import YouTube from "react-youtube";
import React, {useState} from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CloseIcon from "@material-ui/icons/Close";
import {useVideo} from "../context/video-context.js";
export function VideoPage({videoId, setShowVideoPage}) {
  const [showPlayList, setShowPlayList] = useState(false);
  const {
    value: {data, likes, playLists},
    dispatch,
  } = useVideo();
  console.log(videoId);
  const video = data.filter((prev) => prev.id === videoId)[0];
  const isInPlayList = (playlist, currentVideoId) => {
    return playlist.videos.filter((prev) => prev === videoId).length > 0;
  };
  const togglePlayList = (playList, currentVideoId) => {
    isInPlayList(playList, currentVideoId)
      ? dispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: {playList, videoId: currentVideoId},
        })
      : dispatch({
          type: "ADD_TO_PLAYLIST",
          payload: {playList, videoId: currentVideoId},
        });
  };
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
            onClick={() => dispatch({type: "TOGGLE_LIKE", payload: video})}
          >
            <ThumbUpAltIcon />
            <span>{video.totalLikes}</span>
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
          <div className="add-to-playlist ">
            <div className="md flex row justify-content-space-between align-items-center ">
              SaveTo..
              <button className="gray" onClick={() => setShowPlayList(false)}>
                <CloseIcon />
              </button>
            </div>
            <hr />
            <div>
              {playLists.map((prev) => (
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={isInPlayList(prev, videoId)}
                    onChange={() => togglePlayList(prev, videoId)}
                  />
                  {prev.name}
                  <br />
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
