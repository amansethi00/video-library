import React, {useState} from "react";
import "./VideoPage.css";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {useVideo} from "../context/video-context";

export function VideoPagePlayList({
  showNewPlaylist,
  setShowNewPlaylist,
  showPlayList,
  setShowPlayList,
  videoId,
}) {
  const {
    value: {playLists},
    dispatch,
  } = useVideo();
  const [newPlayList, setNewPlayList] = useState("");
  const isInPlayList = (playlist, currentVideoId) => {
    return playlist.videos.filter((prev) => prev === videoId).length > 0;
  };
  const togglePlayList = (playList, currentVideoId) => {
    isInPlayList(playList, currentVideoId)
      ? dispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: {playList, videoId: currentVideoId},
        })
      : dispatch({
          type: "ADD_TO_PLAYLIST",
          payload: {playList, videoId: currentVideoId},
        });
  };
  const addNewPlayList = () => {
    if (newPlayList !== "") {
      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: {name: newPlayList, videos: [videoId], id: videoId},
      });
      closePlayList();
    }
  };
  const closePlayList = () => {
    setShowPlayList(false);
    setShowNewPlaylist(false);
  };
  return (
    <div>
      {showPlayList && (
        <>
          <div className="add-to-playlist-container"></div>
          <div className="add-to-playlist ">
            <div className="md flex row justify-content-space-between align-items-center ">
              SaveTo..
              <button className="gray" onClick={closePlayList}>
                <CloseIcon />
              </button>
            </div>
            <hr />
            <div>
              {playLists.map((prev) => (
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={isInPlayList(prev, videoId)}
                    onChange={() => togglePlayList(prev, videoId)}
                  />
                  {prev.name}
                  <br />
                </label>
              ))}
              {/* <VideoPagePlayList showNewPlaylist={showNewPlaylist} setShowNewPlaylist={setShowNewPlaylist}/> */}
              {showNewPlaylist === false && (
                <button
                  className="row flex align-items-center sm mg-top-half pd-0 "
                  onClick={() => setShowNewPlaylist(true)}
                >
                  <AddIcon />
                  Create New Playlist
                </button>
              )}
              {showNewPlaylist && (
                <>
                  <div class="input-grp-sm mg-top-1">
                    <input
                      required
                      class="input"
                      placeholder="Enter playlist name"
                      onChange={(event) => setNewPlayList(event.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary-sm"
                    onClick={addNewPlayList}
                  >
                    Create
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
