import {createContext, useContext, useReducer} from "react";
import {reducer} from "../reducer/video-reducer";
const VideoContext = createContext();
export const VideoProvider = ({children}) => {
  const data = [];
  const playLists = [];
  const likedVideos = [];
  const watchedVideos = [];
  const [value, dispatch] = useReducer(reducer, {
    data,
    playLists,
    likedVideos,
    watchedVideos,
    searchQuery: "",
  });
  console.log(value);
  return (
    <VideoContext.Provider value={{value, dispatch}}>
      {children}
    </VideoContext.Provider>
  );
};
export const useVideo = () => useContext(VideoContext);
