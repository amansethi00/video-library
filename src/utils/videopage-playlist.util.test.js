import {isInPlayList} from "./videpage-playlist";

describe("should test functions of videopage playlist", () => {
  test("should return true for presence of a videoId in the playlist videos", () => {
    const playlist = {
      _id: 1,
      name: "abracadabra",
      videos: [
        {
          _id: "12",
          title: "some title 12",
          length: 10,
        },
        {
          _id: "13",
          title: "some title 13",
          length: 100,
        },
        {
          _id: "14",
          title: "some title 14",
          length: 1000,
        },
      ],
    };
    expect(true).toEqual(isInPlayList(playlist, "12"));
  });
  test("should return false for absence of a videoId in the playlist videos", () => {
    const playlist = {
      _id: 1,
      name: "abracadabra",
      videos: [
        {
          _id: "12",
          title: "some title 12",
          length: 10,
        },
        {
          _id: "13",
          title: "some title 13",
          length: 100,
        },
        {
          _id: "14",
          title: "some title 14",
          length: 1000,
        },
      ],
    };
    expect(false).toEqual(isInPlayList(playlist, "120"));
  });
});
