import './App.css';
import { Header } from "./components/Header";
import { VideoList } from "./components/VideoList";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app">
        <Header setShowSidebar={setShowSidebar} className="header"/>
      <div className="aside">
      {showSidebar && <Sidebar />}

      </div>
      <div className="videolist">
        <VideoList/>
      </div>
    </div>
  );
}

export default App;
