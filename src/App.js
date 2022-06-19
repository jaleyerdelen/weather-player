import { useEffect, useState } from "react";
import SpotifyPlayList from "./components/Spotify/SpotifyPlayList";
import SpotifyHotPlayList from "./components/Spotify/SpotifyHotPlayList";
import SpotifySnowPlayList from "./components/Spotify/SpotifySnowPlayList";
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const REACT_APP_CLIENT_IDS = process.env.REACT_APP_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const REACT_APP_WEATHER_IDS = process.env.REACT_APP_WEATHER_ID;

const SpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumlater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumlater[key] = value;
    return accumlater;
  }, {});
  return paramsSplitUp;
};

function App() {
  const [location, setLocation] = useState("istanbul");
  const [weather, setWeather] = useState("");

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
    openWeather(location);
  }, [location]);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${REACT_APP_CLIENT_IDS}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const geolocation = () => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        if (res.data.country_name || res.data.city) {
          setLocation(res.data.city);
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const openWeather = (location) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_WEATHER_IDS}&units=metric`
      )
      .then((res) => {
        setWeather(res.data.main.temp);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/playlist" element={<SpotifyPlayList weathers={weather} />} /> */}
          <Route path="/hotplaylist" element={<SpotifyHotPlayList />} />
          <Route path="/snowplaylist" element={<SpotifySnowPlayList />} />
          <Route path="/" element={<Navbar />} />
        </Routes>
        <div className="container">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Login to spotify
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <button className="btn btn-info" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Learn current weather and location
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div>{`location is ${location}`}</div>
                  <div>
                    <div>
                      Weather is {weather} <span>&#8451;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Open to your playlist
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div>
                    {weather > 10 && weather < 34 ? <SpotifyPlayList /> : ""}

                    {weather > 35 && weather < 70 ? <SpotifyHotPlayList /> : ""}

                    {weather > -50 && weather < 0 ? (
                      <SpotifySnowPlayList />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
