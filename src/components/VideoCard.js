import React from "react";
import {Link} from "react-router-dom";
import {useVideo} from "../context/video-context";
import "./VideoCard.css";

export const VideoCard = ({itemId, setVideoId, setShowVideoPage}) => {
  const {
    value: {data},
  } = useVideo();

  const item = data.filter((prev) => prev.videoId === itemId)[0];

  console.log("item", item, itemId);

  return (
    <>
      <div className="videocard mg-half mg-bottom-1" style={{height: "15rem"}}>
        <Link to={`/${item._id}`}>
          <img
            src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLA6DxuVPYywEtlzLiVxlmx9jNpsGw`}
            className="card-image"
            alt="video-thumbnail"
            style={{maxHeight: "10rem", cursor: "pointer"}}
            onClick={() => {
              setShowVideoPage(true);
            }}
          />
        </Link>

        <div className="flex" style={{width: "100%", position: "relative"}}>
          <img
            src={`https://img.youtube.com/vi/${item.videoId}/0.jpg`}
            class="avatar-sm pointer"
            alt="some-img"
          />
          <div
            className="white sm pd-quarter"
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "-2rem",
              backgroundColor: "black",
            }}
          >
            {item.length}
          </div>
          <div className=" mg-left-half ">
            <Link
              to={`/${item.videoId}`}
              style={{textDecoration: "none", color: "var(--text-color"}}
            >
              <div className="bold title">{item.title}</div>
            </Link>
            <div className="gray sm">
              <div>{item.channelName}</div>
              <div>
                {item.views} views <span>•{item.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
