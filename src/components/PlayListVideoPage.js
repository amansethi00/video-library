import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useVideo} from "../context/video-context";
import {VideoCard} from "./VideoCard";
import {VideoList} from "./VideoList";
import {VideoPage} from "./VideoPage";
import "./PlayListVideoPage.css";
export function PlayListVideoPage() {
  let {playlistid} = useParams();
  const {
    value: {data, playLists},
  } = useVideo();

  console.log(playLists);
  console.log(playlistid);
  console.log(playLists.filter((prev) => prev._id == playlistid));
  const getPlayListFirstVideo = (playlistid) => {
    return playLists.filter((prev) => prev._id === playlistid)[0].videos[0]._id;
  };

  const getAll = (playlistid) => {
    return playLists.filter((prev) => prev._id === playlistid)[0].videos;
  };

  const [currentVid, setCurrentVid] = useState(
    getPlayListFirstVideo(playlistid)
  );
  if (getPlayListFirstVideo(playlistid) !== currentVid) {
    setCurrentVid(getPlayListFirstVideo(playlistid));
  }

  console.log(currentVid);
  return (
    <div className="playlist-videopage">
      {currentVid && (
        <>
          {" "}
          <VideoPage vid={currentVid} />
          <VideoList
            title={"Other videos in the Playlist"}
            value={getAll(playlistid)}
          />
        </>
      )}
      {!currentVid && (
        <h1 className="empty-playlist">Ther are no videos here</h1>
      )}
    </div>
  );
}
