import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MusicHolder from './components/MusicHolder';
import axios from 'axios'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  const [authorizationCode, setAuthorizationCode] = useState("")

  const handleAuthorizationCode = (code: string) => {
    setAuthorizationCode(code)
  }


  return (
    <div>
      {!authorizationCode && <Login handleAuthorizationCode={handleAuthorizationCode} />}
      {authorizationCode && <Home authorizationCode={authorizationCode} />}
    </div>
  );
}

export default App;
