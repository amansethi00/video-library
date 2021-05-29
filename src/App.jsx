import './App.css';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from './components/MobileNav';
import React from "react";
import { useState } from "react";   
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Home } from "./components/Home/Home";
import { useVideo } from './context/video-context';
import { useAuth } from './context/auth-context';
import {useEffect} from 'react';
const VideoList = React.lazy(()=>import("./components/VideoList"));
const VideoPage = React.lazy(()=>import("./components/VideoPage/VideoPage"));
const LikedList = React.lazy(()=>import('./components/LikedList/LikedList'));
const WatchedList = React.lazy(()=>import('./components/WatchedList/WatchedList'));
const Login = React.lazy(()=>import('./components/LoginAndSignup/Login'));
const Signup = React.lazy(()=>import('./components/LoginAndSignup/Signup'));
const PlayLists = React.lazy(()=>import("./components/PlayLists/PlayLists"));
const PlayListVideoPage = React.lazy(()=>import("./components/PlayLists/PlayListVideoPage"));
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
      <React.Suspense fallback={<span>Loading...</span>}>
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
      </React.Suspense>

{/* 
      <Routes>

      </Routes> */}
      </div>
    </div>
  );
}

export default App;
