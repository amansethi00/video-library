import './App.css';
import { Header } from "./components/Header";
import { VideoList } from "./components/VideoList";
import { VideoPage } from "./components/VideoPage";
import { PlayListVideoPage } from "./components/PlayListVideoPage";
import { Sidebar } from "./components/Sidebar";
import { PlayLists } from "./components/PlayLists";
import { useState } from "react";   
import { Route, Routes } from 'react-router-dom';
import { LikedList } from './components/LikedList';
import { WatchedVideosList } from './components/WatchedVideosList';
import { MobileNav } from './components/MobileNav';
import { PrivateRoute } from './PrivateRoute';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import {Home} from "./components/Home";
import { useVideo } from './context/video-context';
import { useAuth } from './context/auth-context';
import {useEffect} from 'react';
function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const {value:{data}}=useVideo();
  const {setLogin}= useAuth();
  useEffect(() => {
    if (
      localStorage?.getItem("username") !== undefined &&
      localStorage.getItem("password") !== undefined && localStorage.getItem("isLogin")
    ) {
      setLogin(true);
    }
  }, []);
  return (
    <div className="app">

        
      <div className="aside">
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar}/>}

      </div>
      <MobileNav/>
      <div>
      <Header setShowSidebar={setShowSidebar} className="header"/>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
          <Route path="/:videoId" element={<VideoPage/>}></Route>
          <PrivateRoute path="/playlists" element={<PlayLists/>}></PrivateRoute>
          <PrivateRoute path="/likedlist" element={<LikedList/>}></PrivateRoute>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <PrivateRoute path="/history" element={<WatchedVideosList/>}></PrivateRoute>
          <PrivateRoute path="/playlists/:playlistid" element={<PlayListVideoPage/>}></PrivateRoute>
          <Route path="/playlists/:playlistid/:videoId" element={<PlayListVideoPage/>}></Route>
          <Route path="*" element={<VideoList value={data} />}></Route>
      </Routes>
      {/* <PrivateRoute/> */}

      </div>

    </div>
  );
}

export default App;
