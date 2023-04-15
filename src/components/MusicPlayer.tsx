import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


interface Props{
  token: string,
  songUri: string[]
}

const MusicPlayer: React.FC<Props> = ({token, songUri}) => {
  const [play, setPlay] = useState<boolean>(false)

  useEffect(() => {
    setPlay(true)
  }, [songUri])

  return(
    <div className="border border-red-500">
     {token && (
      <div className="fixed w-11/12 bottom-0">
        <SpotifyPlayer
        token={token}
        uris={songUri}
        initialVolume={0.5}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        showSaveIcon
        magnifySliderOnHover
        persistDeviceSelection
        styles={{
          sliderColor: '#cbd5e0'
        }}
        />
      </div>
     )}
    </div>
  )
}

export default MusicPlayer