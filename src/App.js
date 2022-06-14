import { useEffect, useState } from "react";
import SpotifyPlayList from "./components/Spotify/SpotifyPlayList";
import SpotifyHotPlayList from "./components/Spotify/SpotifyHotPlayList";
import SpotifySnowPlayList from "./components/Spotify/SpotifySnowPlayList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const REACT_APP_CLIENT_IDS = process.env.REACT_APP_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const SpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumlater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumlater[key] = value;
    return accumlater;
  }, {});
  return paramsSplitUp;
};

function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = SpotifyAuth(
        window.location.hash
      );
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("expires_in", expires_in);
    }
  }, []);

  useEffect(() => {
    geolocation();
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${REACT_APP_CLIENT_IDS}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const geolocation = () => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setLocation(res.data.city);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/playlist" element={<SpotifyPlayList />} />
          <Route path="/hotplaylist" element={<SpotifyHotPlayList />} />
          <Route path="/snowplaylist" element={<SpotifySnowPlayList />} />
        </Routes>
        <div className="container">
          <h2>hi</h2>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login to spotify
          </button>
          <div className="fw-bolder mt-5 mb-5">{`location is ${location}`}</div>
          <div>
            <SpotifyPlayList />
            <SpotifyHotPlayList />
            <SpotifySnowPlayList />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
