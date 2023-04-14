import React, { useEffect } from 'react'
import {FaSpotify} from 'react-icons/fa'

interface LoginProps {
  handleAuthorizationCode: (code: string) => void
}

const Login: React.FC<LoginProps> = ({handleAuthorizationCode}) => {
  const redirectUri = process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000/callback"
  const clientId = process.env.REACT_APP_CLIENT_ID

  const handleClick = () => {
    const scopes = "user-read-private user-read-email"
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const url = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
    window.location.replace(url);


  }

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search)
    const code = params.get('code')
    handleAuthorizationCode(code || "")
  }, [handleAuthorizationCode])


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          <FaSpotify className="inline-block mr-2 text-green-400" />
          <span>MuZack</span>
        </h1>
        <p className="text-xl font-semibold mb-8">
          Welcome to MuZack! Your one stop music shop - powered by Spotify (Concert setlists to come)
        </p>
        <button
          onClick={handleClick}
          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login