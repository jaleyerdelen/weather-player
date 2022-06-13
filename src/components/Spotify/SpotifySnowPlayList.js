import { useState, useEffect } from "react";
import axios from "axios";

const SpotifySnowPlayList = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylist = () => {
    axios
      .get("https://api.spotify.com/v1/playlists/6F6UcLhuQ6cWniHd3myyRG", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData(res.data.external_urls.spotify);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={handleGetPlaylist} className="">
        Spotify Snow PlayList
      </button>
      <a rel="noreferrer" target="_blank" href={data}>
      Snow Playlist
      </a>
    </div>
  );
};

export default SpotifySnowPlayList;
