import React, {useState} from "react";
import {useParams} from "react-router";
import {useVideo} from "../context/video-context";
import {VideoList} from "./VideoList";
import {VideoPage} from "./VideoPage";
import "./PlayListVideoPage.css";
import {getAllVideos, getPlayListFirstVideo} from "../utils/index";

export const PlayListVideoPage = () => {
  let {playlistId} = useParams();
  const {
    value: {playLists},
  } = useVideo();

  console.log(playLists);
  console.log(playlistId);
  console.log(playLists.filter((prev) => prev._id === playlistId));
  const [currentVid, setCurrentVid] = useState(
    getPlayListFirstVideo(playLists, playlistId)
  );
  if (getPlayListFirstVideo(playLists, playlistId) !== currentVid) {
    setCurrentVid(getPlayListFirstVideo(playLists, playlistId));
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
            value={getAllVideos(playLists, playlistId)}
          />
        </>
      )}
      {!currentVid && (
        <h1 className="empty-playlist">Ther are no videos here</h1>
      )}
    </div>
  );
};
