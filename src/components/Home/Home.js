import React, {useEffect} from "react";
import {VideoList} from "../VideoList";
import {useVideo, getAllVideosHome} from "../index";
import axios from "axios";
import "./Home.css";
import Loader from "react-loader-spinner";
export const Home = () => {
  const {
    value: {data, searchQuery},
    dispatch,
  } = useVideo();
  useEffect(() => {
    getAllVideosHome({data, dispatch});
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
