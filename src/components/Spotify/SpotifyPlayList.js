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
  
<div className="btn-group">
  <button onClick={handleGetPlaylist} type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Success
  </button>
  <ul className="dropdown-menu">
    <li><a rel="noreferrer" target="_blank" href={data} className="dropdown-item" >Your Playlist</a></li>
  </ul>
</div>
     
     
    </div>
  );
};

export default SpotifyPlayList;
