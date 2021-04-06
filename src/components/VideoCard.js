import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useVideo} from "../context/video-context";
import "./VideoCard.css";

export function VideoCard({itemId, setVideoId, setShowVideoPage}) {
  const {
    value: {data},
    dispatch,
  } = useVideo();
  const item = data.filter((prev) => prev.id === itemId)[0];
  console.log("item", item, itemId);

  return (
    <>
      <div className="videocard mg-half mg-bottom-1" style={{height: "15rem"}}>
        <Link to={`/${item.id}`}>
          <img
            src={`https://img.youtube.com/vi/${item.id}/0.jpg`}
            className="card-image"
            alt="video-thumbnail"
            style={{maxHeight: "10rem", cursor: "pointer"}}
            onClick={() => {
              setShowVideoPage(true);
            }}
          />
        </Link>

        <div class="flex" style={{width: "100%", position: "relative"}}>
          <img
            src={`https://img.youtube.com/vi/${item.id}/0.jpg`}
            class="avatar-sm pointer"
            alt="some-img"
          />
          <div
            className="white sm bold"
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "-1.5rem",
              backgroundColor: "black",
            }}
          >
            {item.length}
          </div>
          <div className=" mg-left-half ">
            <div className="bold">{item.title}</div>
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
}
