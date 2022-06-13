import { useState, useEffect } from "react";
import axios from "axios";

const SpotifyHotPlayList = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylist = () => {
    axios
      .get("https://api.spotify.com/v1/playlists/0UEsTrGQS3X4ljs2LH0nR8", {
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
        Spotify Hot PlayList
      </button>
      <a rel="noreferrer" target="_blank" href={data}>
       Hot Playlist
      </a>
    </div>
  );
};

export default SpotifyHotPlayList;
