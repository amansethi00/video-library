import axios from "axios";
export const getAllVideosHome = async ({data, dispatch}) => {
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
    }
  } catch (error) {
    console.log({error});
  }
};
