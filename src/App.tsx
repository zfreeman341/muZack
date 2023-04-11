import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MusicHolder from './components/MusicHolder';
import axios from 'axios'

function App() {

  const [code, setCode] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    axios.get('/auth/spotify')
      .then(res => {
        setCode(res.data.code)
      }).catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (code) {
      axios.post('/auth', {code})
        .then(res => {
          setData(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [code])

  return (
    <div className="App">
      <header className="App-header">
         MUZACK
      </header>
      <MusicHolder></MusicHolder>
      {data && (
        <div>
          <p>Access Token: {data.accessToken}</p>
          <p>Refresh Token: {data.refreshToken}</p>
          <p>Expires In: {data.expiresIn}</p>
          <p>User ID: {data.userId}</p>
          <p>User Name: {data.name}</p>
          <p>User Email: {data.email}</p>
          <img src={data.image} alt="User" />
          <p>User Product: {data.product}</p>
        </div>
      )}
    </div>
  );
}

export default App;
