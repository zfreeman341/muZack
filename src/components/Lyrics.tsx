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
      <div className="p-4 rounded-lg text-center overflow-y-scroll overflow-contain sticky top-16 h-[calc(100vh-15rem)]">
        <pre
        className="whitespace-pre-wrap inline-block"
        style={{
          textShadow: '1px 1px #9B8EPD',
          color: '#D3D3D3',
          backgroundColor: '#1C1E1C',
          borderRadius: '10px',
          padding: '10px',
          background: 'radial-gradient(ellipse at center, rgba(28,30,28,0.7) 0%,rgba(28,30,28,1) 100%)',
        }}
        >
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <h2 className="txt-lg font-semibold">{artist}</h2>
          {lyrics}</pre>
      </div>
  )
}

export default Lyrics