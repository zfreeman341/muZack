import React, { useState, useEffect, useRef } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


interface Props{
  token: string;
  songUri: string | string[];
  setSongIndex: Function;
  songIndex: number;
  setQueryResults: Function,
  queryResults: any,
  retrieveSongData: Function
}

const MusicPlayer: React.FC<Props> = ({token, songUri, setSongIndex, songIndex, setQueryResults, queryResults, retrieveSongData}) => {
  const [play, setPlay] = useState<boolean>(false)

  useEffect(() => {
    setPlay(true)
  }, [songUri])

  const handleNextTrack = (state?: any) => {
    console.log(state)
      // let nextIndex: any = songIndex + 1
      // if (nextIndex >= queryResults.length) {
      //   nextIndex = 0
      // }
      // setSongIndex(nextIndex)
      // const nextResult: any = queryResults[nextIndex]
      // retrieveSongData(
      //   queryResults[nextIndex].uri,
      //   nextResult!.name!,
      //   nextResult!.artists![0]!.name!,
      //   nextIndex
      // )
      // }
  }

  useEffect(() => {

  })

  return(
    <div className="bg-dark-500 !important">
     {token && (
      <div className="fixed w-11/12 bottom-0">
        <SpotifyPlayer
          token={token}
          uris={songUri}
          initialVolume={0.5}
          // callback={handleCallback}
          play={play}
          showSaveIcon={true}
          magnifySliderOnHover
          persistDeviceSelection
          styles={{
            sliderColor: '#cbd5e0'
          }}
          callback={(state: any) => {
            console.log(state)
          }}
        />
      </div>
     )}
    </div>
  )
}

export default MusicPlayer