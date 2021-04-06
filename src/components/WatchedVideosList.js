import React from "react";
import {useVideo} from "../context/video-context";
import {VideoList} from "./VideoList";
export function WatchedVideosList() {
  const {
    value: {watchedVideos},
  } = useVideo();
  console.log(watchedVideos);

  return (
    <div>
      <VideoList value={watchedVideos} title={"Watched Videos"} />
    </div>
  );
}
