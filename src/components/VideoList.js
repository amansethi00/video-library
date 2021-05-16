import React, {useState} from "react";
import {VideoCard} from "./VideoCard";
import "./VideoList.css";
export const VideoList = ({value, title = null}) => {
  const [showVideoPage, setShowVideoPage] = useState(false);
  const newTitle = title?.toUpperCase() ?? "ALL VIDEOS";

  return (
    <div className=" video-list" style={{minHeight: "100vh"}}>
      <h3 className="mg-left-half">{newTitle}</h3>
      {showVideoPage === false && (
        <div className="flex row">
          {value.map((item) => {
            return (
              <VideoCard
                itemId={item.videoId ?? item}
                setShowVideoPage={setShowVideoPage}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
