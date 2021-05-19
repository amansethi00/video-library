import './App.css';
import { Header } from "./components/Header";
import { VideoList } from "./components/VideoList";
import { VideoPage } from "./components/VideoPage";
import { Sidebar } from "./components/Sidebar";
import { PlayLists,PlayListVideoPage } from "./components/PlayLists";
import { useState } from "react";   
import { Route, Routes } from 'react-router-dom';
import { LikedList } from './components/LikedList';
import { WatchedList } from './components/WatchedList';
import { MobileNav } from './components/MobileNav';
import { PrivateRoute } from './PrivateRoute';
import { Login,Signup } from './components/LoginAndSignup';
import { Home } from "./components/Home/Home";
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
          <PrivateRoute path="/history" element={<WatchedList/>}></PrivateRoute>
          <PrivateRoute path="/playlists/:playlistId" element={<PlayListVideoPage/>}></PrivateRoute>
          <Route path="/playlists/:playlistid/:videoId" element={<PlayListVideoPage/>}></Route>
          <Route path="*" element={<VideoList value={data} />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
