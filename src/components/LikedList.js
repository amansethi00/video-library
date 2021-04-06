import React from "react";
import {useVideo} from "../context/video-context";
import {VideoList} from "./VideoList";

export function LikedList() {
  const {
    value: {likes},
  } = useVideo();
  return (
    <div>
      <VideoList value={likes} title={"Liked Videos"} />
    </div>
  );
}
