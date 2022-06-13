import { useState, useEffect } from "react";
import axios from "axios";

const SpotifyPlayList = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylist = () => {
    axios
      .get("https://api.spotify.com/v1/playlists/4lnoAiRXWIf9h5zjLaP005", {
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
        Spotify PlayList
      </button>
      <a rel="noreferrer" target="_blank" href={data}>
        Playlist
      </a>
    </div>
  );
};

export default SpotifyPlayList;
