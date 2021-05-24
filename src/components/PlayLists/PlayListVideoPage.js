import React, {useState} from "react";
import {useParams} from "react-router";
import {useVideo} from "../index";
import {VideoList} from "../VideoList";
import {VideoPage} from "../VideoPage";
import "./PlayListVideoPage.css";
import {getAllVideos, getPlayListFirstVideo} from "../index";

export const PlayListVideoPage = () => {
  let {playlistId} = useParams();
  const {
    value: {playLists},
  } = useVideo();
  const [currentVid, setCurrentVid] = useState(
    getPlayListFirstVideo(playLists, playlistId)
  );

  return (
    <div className="playlist-videopage">
      {currentVid && (
        <>
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
