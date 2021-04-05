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
function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const {value:{data}}=useVideo();

  return (
    <div className="app">
        <Header setShowSidebar={setShowSidebar} className="header"/>
      <div className="aside">
      {showSidebar && <Sidebar />}

      </div>

      <Routes>
        <Route path="/" exact element={<VideoList value={data}/>}></Route>
        <Route path="/:videoId" element={<VideoPage/>}></Route>
        <Route path="playlists" element={<PlayLists/>}></Route>
        <Route path="playlists/:playlistid" element={<PlayListVideoPage/>}></Route>
        <Route path="playlists/:playlistid/:videoId" element={<PlayListVideoPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
