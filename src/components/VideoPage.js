import "./VideoPage.css";
import YouTube from "react-youtube";
import React, {useState, useEffect} from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import {useVideo} from "../context/video-context.js";
import {useParams} from "react-router-dom";
import {VideoPagePlayList} from "./VideoPagePlayList";
export function VideoPage({vid = null}) {
  const {videoId} = useParams();
  const newVideoId = vid ?? videoId;
  console.log(newVideoId);
  const {
    value: {data, likes},
    dispatch,
  } = useVideo();
  const video = data.filter((prev) => prev.id === newVideoId)[0];
  const [showPlayList, setShowPlayList] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  console.log(videoId);
  console.log(video);
  useEffect(() => {
    const timerId = setTimeout(
      dispatch({type: "ADD_TO_WATCHED_VIDEOS", payload: {videoId: newVideoId}}),
      1000
    );
    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="videopage-container">
      <div className="video-container">
        <YouTube
          videoId={newVideoId}
          className="responsive-iframe"
          opts={{
            paddingTop: "0",
            height: "390",
            width: "640",
            playerVars: {
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
          <VideoPagePlayList
            showNewPlaylist={showNewPlaylist}
            setShowNewPlaylist={setShowNewPlaylist}
            showPlayList={showPlayList}
            setShowPlayList={setShowPlayList}
            videoId={newVideoId}
          />
        </div>
      </div>
    </div>
  );
}
