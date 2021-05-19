import "./VideoPage.css";
import YouTube from "react-youtube";
import React, {useState, useEffect} from "react";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import {useAuth} from "../context/auth-context";
import {useParams} from "react-router-dom";
import {VideoPagePlayList} from "./VideoPagePlayList";
import axios from "axios";
import Loader from "react-loader-spinner";
import {LikeButton} from "./LikeButton";
import {RemoveLikeButton} from "./RemoveLikeButton";
export const VideoPage = ({vid = null}) => {
  const [error, setError] = useState(null);
  const {login} = useAuth();
  const {videoId} = useParams();
  const newVideoId = vid ?? videoId;
  console.log(newVideoId);
  const [showPlayList, setShowPlayList] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [video, setVideo] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [liked, setLiked] = useState(false);
  console.log(videoId);
  // console.log(video);
  useEffect(() => {
    const isLiked = async () => {
      console.log("somehtinf", localStorage.getItem("isLogin"));
      if (localStorage.getItem("isLogin")) {
        try {
          const response = await axios.get(
            `https://videolib.amansethi00.repl.co/likedVideos/${videoId}`,
            {
              headers: {
                Authorization: `${localStorage?.getItem(
                  "username"
                )}:${localStorage?.getItem("password")}`,
              },
            }
          );
          if (response.data.success) {
            console.log(response.data);
            setLiked(response.data.inLikedVideos);
          }
          console.log({response});
        } catch (error) {
          console.log({error});
        }
      }
    };
    isLiked();
  }, []);
  useEffect(() => {
    const getVideoPage = async () => {
      try {
        const response = await axios.get(
          `https://videolib.amansethi00.repl.co/videos/${newVideoId}`
        );
        setVideo(response.data.video);
      } catch (error) {
        console.log({error});
      }
    };
    getVideoPage();
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

  const playlistHandler = () => {
    if (login) {
      setShowPlayList(true);
    } else {
      setError("Please login to perform this action");
    }
  };

  return (
    <div className="videopage-container">
      {}
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
              {liked ? (
                <RemoveLikeButton
                  videoId={videoId}
                  setLiked={setLiked}
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                />
              ) : (
                <LikeButton
                  videoId={videoId}
                  setLiked={setLiked}
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                />
              )}
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
                setSuccessMessage={setSuccessMessage}
              />
            </div>
          </div>
          {successMessage && (
            <div class="toast-success">
              {successMessage}
              <button
                style={{color: "white"}}
                class="outline-none"
                onClick={() => setSuccessMessage(null)}
              >
                X{" "}
              </button>
            </div>
          )}
          {error && (
            <div
              className="toast-success"
              style={{backgroundColor: "var(--red)"}}
            >
              {error}
              <button className="outline-none" onClick={() => setError(null)}>
                X{" "}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
