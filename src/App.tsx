import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MusicHolder from './components/MusicHolder';
import axios from 'axios'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  const [authorizationCode, setAuthorizationCode] = useState<string>(""
  )

  const [accessToken, setAccessToken] = useState<string>('')

  const handleAuthorizationCode = (code: string) => {
    setAuthorizationCode(code)
    localStorage.setItem("authorizationCode", code)
  }

  useEffect(() => {
    console.log(authorizationCode)
  },[authorizationCode])

  // useEffect(() => {
  //   setAuthorizationCode(localStorage.getItem("authorizationCode"))
  // }, [handleAuthorizationCode])

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search)
    const code = params.get('code')
    handleAuthorizationCode(code || "")
  }, [authorizationCode])


  useEffect(() => {
    axios.post('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);


  return (
    <div className="h-screen bg-gray-900">
      {authorizationCode.length === 0 && <Login handleAuthorizationCode={handleAuthorizationCode}
      authorizationCode={authorizationCode} />}
      {authorizationCode.length > 0 && <Home authorizationCode={authorizationCode} />}
    </div>
  );
}

export default App;
