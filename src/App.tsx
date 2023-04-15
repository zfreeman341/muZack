import React, {useState, useEffect} from 'react';
import './App.css';
import logo from './logo/logo.png'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  const [authorizationCode, setAuthorizationCode] = useState<string>(""
  )

  const handleAuthorizationCode = (code: string) => {
    setAuthorizationCode(code)
    localStorage.setItem("authorizationCode", code)
  }

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code !== null) {
    setAuthorizationCode(code)
    }
  }, [])


  // // useEffect(() => {
  //   setAuthorizationCode(localStorage.getItem("authorizationCode"))
  // }, [handleAuthorizationCode])

  // useEffect(() => {
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search)
  //   const code = params.get('code')
  //   handleAuthorizationCode(code || "")
  // }, [authorizationCode])

  return (
    // <div className="w-full h-full z-0">
    <div className="bg-dark-500 !important">
      {authorizationCode.length === 0 && <Login handleAuthorizationCode={handleAuthorizationCode}
      authorizationCode={authorizationCode} />}
      {authorizationCode.length > 0 && <Home authorizationCode={authorizationCode} />}
    </div>
  );
}

export default App;
