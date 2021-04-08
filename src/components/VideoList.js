import React, {useState} from "react";
import {useVideo} from "../context/video-context";
import {VideoCard} from "./VideoCard";
import "./VideoList.css";
import {VideoPage} from "./VideoPage";
export function VideoList({value, title = null}) {
  // const {value} = useVideo();
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [videoId, setVideoId] = useState("");
  const newTitle = title ?? "All Videos";
  return (
    <div className=" video-list" style={{minHeight: "100vh"}}>
      <h3 className="mg-left-half">{newTitle.toUpperCase()}</h3>
      {/* <div className="card" style={{width: "15rem"}}>
        <iframe
          src="https://www.youtube.com/embed/4vFaFbtFLOQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div> */}
      {/* {showVideoPage === true && (
        <VideoPage videoId={videoId} setShowVideoPage={setShowVideoPage} />
      )} */}
      {showVideoPage === false && (
        <div className="flex row">
          {value.map((item) => {
            return (
              <VideoCard
                itemId={item.id ?? item}
                setShowVideoPage={setShowVideoPage}
                setVideoId={setVideoId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
