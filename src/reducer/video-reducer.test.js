import {reducer} from "./video-reducer";

describe("should set data to the state", () => {
  test("setting data", () => {
    const initialState = {
      data: [],
      searchQuery: "q",
    };
    const payload = {
      data: [1, 2, 3],
    };
    const finalState = {
      ...initialState,
      data: [1, 2, 3],
    };
    const action = {
      type: "SET_DATA",
      payload,
    };
    expect(finalState).toEqual(reducer(initialState, action));
  });
});

describe("should set liked videos to the state", () => {
  test("setting liked videos", () => {
    const initialState = {
      likedVideos: [],
    };
    const finalState = {
      likedVideos: [1, 2, 3],
    };
    const action = {
      type: "SET_LIKEDVIDEOS",
      payload: {
        likedVideos: [1, 2, 3],
      },
    };
    expect(finalState).toEqual(reducer(initialState, action));
  });
});

describe("should set watched videos to the state", () => {
  test("setting watched videos", () => {
    const initialState = {
      watchedVideos: [],
    };
    const finalState = {
      watchedVideos: [1, 2, 3],
    };
    const action = {
      type: "SET_WATCHEDVIDEOS",
      payload: {
        watchedVideos: [1, 2, 3],
      },
    };
    expect(finalState).toEqual(reducer(initialState, action));
  });
});

describe("should set playlists to the state", () => {
  test("setting playlists", () => {
    const initialState = {
      playLists: [],
    };
    const finalState = {
      playLists: [1, 2, 3],
    };
    const action = {
      type: "SET_PLAYLISTS",
      payload: {
        playlists: [1, 2, 3],
      },
    };
    expect(finalState).toEqual(reducer(initialState, action));
  });
});

describe("Should set search query to the state", () => {
  test("setting search query", () => {
    const initialState = {
      searchQuery: "",
    };
    const finalState = {
      searchQuery: "hello world",
    };
    const action = {
      type: "SET_SEARCH_QUERY",
      payload: {
        query: "hello world",
      },
    };
    expect(finalState).toEqual(reducer(initialState, action));
  });
});
