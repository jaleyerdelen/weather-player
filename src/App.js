import { useEffect } from "react";
import SpotifyPlayList from './components/Spotify/SpotifyPlayList'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const REACT_APP_CLIENT_IDS = process.env.REACT_APP_CLIENT_ID
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

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${REACT_APP_CLIENT_IDS}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/playlist" element={ <SpotifyPlayList /> }  /> 
      
      </Routes>
      
      
    <div className="container">
      <h2>hi</h2>
      <button className="btn btn-primary"onClick={handleLogin}>Login to spotify</button>
      <div className="mt-5">
        <SpotifyPlayList />
      </div>
    </div>
    </BrowserRouter>
    </>
   
  );
}

export default App;
