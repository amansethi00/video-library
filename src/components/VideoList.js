import React from "react";
import {useVideo} from "../context/video-context";
import {VideoCard} from "./VideoCard";
export function VideoList() {
  const {value} = useVideo();
  return (
    <div className="card " style={{minHeight: "100vh"}}>
      <h3>I am Video listing</h3>
      {/* <div className="card" style={{width: "15rem"}}>
        <iframe
          src="https://www.youtube.com/embed/4vFaFbtFLOQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div> */}
      <div className="flex row">
        {value.map((item) => {
          return <VideoCard item={item} />;
        })}
      </div>
    </div>
  );
}
