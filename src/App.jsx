import './App.css';
import { Header } from "./components/Header";
import { VideoList } from "./components/VideoList";
import { VideoPage } from "./components/VideoPage";
import { PlayListVideoPage } from "./components/PlayListVideoPage";
import { Sidebar } from "./components/Sidebar";
import { PlayLists } from "./components/PlayLists";
import { useState } from "react";
import { Route, Routes } from 'react-router';
import { useVideo } from './context/video-context';
import { LikedList } from './components/LikedList';
import { WatchedVideosList } from './components/WatchedVideosList';
import { MobileNav } from './components/MobileNav';
function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const {value:{data}}=useVideo();

  return (
    <div className="app">

        
      <div className="aside">
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar}/>}

      </div>
      <MobileNav/>
      <div>
      <Header setShowSidebar={setShowSidebar} className="header"/>
      <Routes>
        <Route path="/" exact element={<VideoList value={data} />}></Route>
        <Route path="/:videoId" element={<VideoPage/>}></Route>
        <Route path="playlists" element={<PlayLists/>}></Route>
        <Route path="likedlist" element={<LikedList/>}></Route>
        <Route path="history" element={<WatchedVideosList/>}></Route>
        <Route path="playlists/:playlistid" element={<PlayListVideoPage/>}></Route>
        <Route path="playlists/:playlistid/:videoId" element={<PlayListVideoPage/>}></Route>
        <Route path="/*" element={<VideoList value={data} />}></Route>
      </Routes>
      </div>

    </div>
  );
}

export default App;
