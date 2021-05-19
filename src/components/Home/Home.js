import React, {useEffect} from "react";
import {VideoList} from "../VideoList";
import {useVideo} from "../index";
import axios from "axios";
import "./Home.css";
import Loader from "react-loader-spinner";
export const Home = () => {
  const {
    value: {data, searchQuery},
    dispatch,
  } = useVideo();
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        if (data.length < 1) {
          const response = await axios.get(
            "https://videolib.amansethi00.repl.co/videos"
          );
          console.log({response});
          dispatch({
            type: "SET_DATA",
            payload: {
              data: response.data.videos,
            },
          });
          console.log({data});
        }
      } catch (error) {
        console.log({error});
      }
    };
    getAllVideos();
  }, []);
  return (
    <>
      {data.length < 1 ? (
        <div className="loader">
          {" "}
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <VideoList
          value={data.filter((prev) =>
            new RegExp(searchQuery, "i").test(prev.title)
          )}
        />
      )}
    </>
  );
};
