import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useVideo} from "../context/video-context";
import {VideoCard} from "./VideoCard";
import {VideoList} from "./VideoList";
import {VideoPage} from "./VideoPage";
export function PlayListVideoPage() {
  let {playlistid} = useParams();
  const {
    value: {data, playLists},
  } = useVideo();
  console.log(playLists);
  console.log(playlistid);
  console.log(playLists.filter((prev) => prev.id == playlistid));
  const getPlayListVideos = (playlistid) => {
    return playLists.filter((prev) => prev.id == playlistid)[0].videos[0];
  };

  const getAll = (playlistid) => {
    return playLists.filter((prev) => prev.id == playlistid)[0].videos;
  };

  return (
    <div>
      <VideoPage vid={getPlayListVideos(playlistid)} />

      <VideoList
        title={"Other videos in the Playlist"}
        value={getAll(playlistid)}
      />
    </div>
  );
}
