import React, { useState } from "react";
import { VideoCard } from "./VideoCard";
import "./VideoList.css";
import Loader from "react-loader-spinner";

export const VideoList = ({ value, title = null, loading }) => {
  const [showVideoPage, setShowVideoPage] = useState(false);
  const newTitle = title?.toUpperCase() ?? "ALL VIDEOS";

  return (
    <div className=" video-list" style={{ minHeight: "100vh" }}>
      <div className="flex row align-items-center justify-center">
        <h2 className="mg-left-half">{newTitle} </h2>
        {loading && (
          <Loader
            style={{ paddingLeft: "0.5rem" }}
            type="Grid"
            color="#00BFFF"
            height={30}
            width={20}
          />
        )}{" "}
      </div>

      {showVideoPage === false && (
        <div className="flex row">
          {value.map((item, index) => {
            return (
              <VideoCard
                key={index}
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
