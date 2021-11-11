import './VideoPage.css';
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { useAuth } from '../index';
import { useParams } from 'react-router-dom';
import { VideoPagePlayList } from './VideoPagePlayList';
import Loader from 'react-loader-spinner';
import { LikeButton } from './LikeButton';
import { RemoveLikeButton } from './RemoveLikeButton';
import {
  isLikedVideo,
  getVideoPage,
  playlistHandler,
  addToWatchedVideos,
} from '../index';

const VideoPage = ({ vid = null }) => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const { videoId } = useParams();
  const newVideoId = vid ?? videoId;
  const [showPlayList, setShowPlayList] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [video, setVideo] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log('new  video id', newVideoId);
    isLikedVideo({ setLiked, setError, videoId: newVideoId });
  }, []);
  useEffect(() => {
    getVideoPage({ setVideo, newVideoId });
  }, []);
  console.log('videoopage loadedede');
  return (
    <div className='videopage-container'>
      {video === null && (
        <div className='videopage-loader'>
          <Loader
            type='Grid'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}
      {video !== null && (
        <>
          <div className='video-container'>
            <YouTube
              videoId={video.videoId}
              className='responsive-iframe'
              onReady={() => addToWatchedVideos({ newVideoId })}
              opts={{
                paddingTop: '0',
                height: '390',
                width: '700',
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
          <h2 className='card-head'>{video.title}</h2>
          <div className='flex row gray video-actions '>
            <div>
              <span className=' sm'>{video.views} views</span>
              <span className=' sm'>•{video.uploadDate.slice(0, 10)}</span>
            </div>
            <div className='align-items-center row flex '>
              {liked ? (
                <RemoveLikeButton
                  videoId={newVideoId}
                  setLiked={setLiked}
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                />
              ) : (
                <LikeButton
                  videoId={newVideoId}
                  setLiked={setLiked}
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                />
              )}
              <button
                className='align-items-center row flex mg-right-half gray md'
                onClick={() =>
                  playlistHandler({ setShowPlayList, setError, login })
                }
              >
                <PlaylistAddIcon />
                <span>SAVE</span>
              </button>
              <VideoPagePlayList
                showNewPlaylist={showNewPlaylist}
                setShowNewPlaylist={setShowNewPlaylist}
                showPlayList={showPlayList}
                setShowPlayList={setShowPlayList}
                videoId={newVideoId}
                setError={setError}
                setSuccessMessage={setSuccessMessage}
              />
            </div>
          </div>
          {successMessage && (
            <div class='toast-success'>
              {successMessage}
              <button
                style={{ color: 'white' }}
                class='outline-none'
                onClick={() => setSuccessMessage(null)}
              >
                X{' '}
              </button>
            </div>
          )}
          {error && (
            <div
              className='toast-success'
              style={{ backgroundColor: 'var(--red)' }}
            >
              {error}
              <button className='outline-none' onClick={() => setError(null)}>
                X{' '}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default VideoPage;
