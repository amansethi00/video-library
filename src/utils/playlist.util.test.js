import {getPlayListFirstVideo, getAllVideos} from "./playlist";

describe("should test playlist utils", () => {
  test("should return first playlist video object of the playlist given", () => {
    const playlists = [
      {
        _id: 1,
        name: "test playlist 1",
        videos: [
          {_id: 12, title: "some title 12"},
          {_id: 13, title: "some title 13"},
          {_id: 14, title: "some title 14"},
        ],
      },
      {
        _id: 2,
        name: "test playlist 2",
        videos: [
          {_id: 22, title: "some title 22"},
          {_id: 23, title: "some title 23"},
          {_id: 24, title: "some title 24"},
        ],
      },
    ];
    const expectedPlaylist = 12;
    expect(expectedPlaylist).toEqual(getPlayListFirstVideo(playlists, 1));
  });
  test("should return all videos of a playlist", () => {
    const playlists = [
      {
        _id: 1,
        name: "test playlist 1",
        videos: [
          {_id: 12, title: "some title 12"},
          {_id: 13, title: "some title 13"},
          {_id: 14, title: "some title 14"},
        ],
      },
      {
        _id: 2,
        name: "test playlist 2",
        videos: [
          {_id: 22, title: "some title 22"},
          {_id: 23, title: "some title 23"},
          {_id: 24, title: "some title 24"},
        ],
      },
    ];
    const expectedVideos = [
      {_id: 22, title: "some title 22"},
      {_id: 23, title: "some title 23"},
      {_id: 24, title: "some title 24"},
    ];
    expect(expectedVideos).toEqual(getAllVideos(playlists, 2));
  });
});
