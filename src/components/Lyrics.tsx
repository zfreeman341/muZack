import React, {useState, useEffect} from 'react'
import axios from 'axios'

interface Props{
  artist: string
  title: string
  url: string
}

const Lyrics: React.FC<Props> = ({artist, title, url}) => {
  const [lyrics, setLyrics] = useState<string>('No Lyrics Found')

  useEffect(() => {
    if (artist === '' || title === '') return;
    axios.get(`${url}/lyrics/${artist}/${title}`)
    .then(res => setLyrics(res.data))
    .catch(err => console.error(err))
  }, [artist, title, url])

  return (
      <div className="p-4 rounded-lg text-center">
        <div className="bg-dark-100text-white p-4 rounded-lg mb-4">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <h2 className="text-lg font-semibold">{artist}</h2>
        </div>
        <pre
        className="whitespace-pre-wrap inline-block"
        style={{
          textShadow: '1px 1px #9B8EPD',
          color: '#27BD5C',
          backgroundColor: '#1C1E1C',
          borderRadius: '10px',
          padding: '10px',
          opacity: 0.8
        }}s
        >{lyrics}</pre>
      </div>
  )
}

export default Lyrics