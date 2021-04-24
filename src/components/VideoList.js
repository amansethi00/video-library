import React, {useState} from "react";
import {useVideo} from "../context/video-context";
import {VideoCard} from "./VideoCard";
import "./VideoList.css";
import {VideoPage} from "./VideoPage";
export function VideoList({value, title = null}) {
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [videoId, setVideoId] = useState("");
  const newTitle = title ?? "All Videos";

  return (
    <div className=" video-list" style={{minHeight: "100vh"}}>
      <h3 className="mg-left-half">{newTitle.toUpperCase()}</h3>
      {showVideoPage === false && (
        <div className="flex row">
          {value.map((item) => {
            return (
              <VideoCard
                itemId={item.videoId ?? item}
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
