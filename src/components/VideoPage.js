import "./VideoPage.css";
import YouTube from "react-youtube";
import React, {useState, useEffect} from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import {useVideo} from "../context/video-context.js";
import {useAuth} from "../context/auth-context";
import {useParams} from "react-router-dom";
import {VideoPagePlayList} from "./VideoPagePlayList";
import axios from "axios";
import Loader from "react-loader-spinner";

export function VideoPage({vid = null}) {
  const [error, setError] = useState(null);
  const {login} = useAuth();
  const {videoId} = useParams();
  const newVideoId = vid ?? videoId;
  console.log(newVideoId);
  const {
    value: {data, likes},
    dispatch,
  } = useVideo();

  const [showPlayList, setShowPlayList] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [video, setVideo] = useState(null);
  console.log(videoId);
  // console.log(video);

  useEffect(() => {
    const anonymousFunction = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/videos/${newVideoId}`
        );
        setVideo(response.data.video);
      } catch (error) {
        console.log({error});
      }
    };
    anonymousFunction();
  }, []);
  const addToWatchedVideos = async () => {
    try {
      const response = await axios.post(
        `https://videolib.amansethi00.repl.co/watchedVideos/${newVideoId}`,
        "some",
        {
          headers: {
            Authorization: `${localStorage?.getItem(
              "username"
            )}:${localStorage?.getItem("password")}`,
          },
        }
      );
      console.log({response});
    } catch (error) {}
  };
  const addToLikedVideos = async (videoId) => {
    try {
      const response = await axios.post(
        `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
        "data",
        {
          headers: {
            Authorization: `${localStorage?.getItem(
              "username"
            )}:${localStorage.getItem("password")}`,
          },
        }
      );
      if (response.data.success === false) {
        setError(response.data.message);
      }
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);

      console.log({error});
    }
  };
  const playlistHandler = () => {
    if (login) {
      setShowPlayList(true);
    } else {
      setError("Please login to perform this action");
    }
  };
  return (
    <div className="videopage-container">
      {error && (
        <div className="toast-error mg-bottom-1 errorBox-videopage">
          {error}
          <button className="outline-none" onClick={() => setError(null)}>
            X{" "}
          </button>
        </div>
      )}
      {video === null && (
        <div className="videopage-loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}
      {video !== null && (
        <>
          <div className="video-container">
            <YouTube
              videoId={video.videoId}
              className="responsive-iframe"
              onReady={addToWatchedVideos}
              opts={{
                paddingTop: "0",
                height: "390",
                width: "700",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
          <h2 className="card-head">{video.title}</h2>
          <div className="flex row gray video-actions ">
            <div>
              <span className=" sm">{video.views} views</span>
              <span className=" sm">•{video.uploadDate.slice(0, 10)}</span>
            </div>
            <div className="align-items-center row flex ">
              <button
                className="align-items-center row flex mg-right-half gray md"
                style={{
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() => addToLikedVideos(newVideoId)}
              >
                <span>add to liked videos</span>
                <ThumbUpAltIcon />
              </button>
              <button
                className="align-items-center row flex mg-right-half gray md"
                onClick={playlistHandler}
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
                setError={setError}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
