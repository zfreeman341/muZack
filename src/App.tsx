import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MusicHolder from './components/MusicHolder';
import axios from 'axios'

function App() {


  const [data, setData] = useState({})

  const [code, setCode] = useState('')

  useEffect(() => {
    axios.post('/auth', {code})
    .then(res => {
      console.log(res)
      setData({data: res.data, code: res.status})
    })
    .catch(err => {
      console.error(err)
    })

  }, [code])

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

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    console.log(code)
  }, [code])

  return (
    <div className="App">
      <header className="App-header">
         MUZACK
      </header>
      <MusicHolder></MusicHolder>
    </div>
  );
}

export default App;
