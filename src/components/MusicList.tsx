import React, {useState, useEffect, SyntheticEvent} from 'react';
// import Table from './Table';
// import Paper from './Paper';

interface Column {
  id: 'index' | 'title' | 'artist' | 'album' | 'duration'
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'index', label: '#'},
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'artist', label: 'Artist', maxWidth: 100},
  { id: 'album', label: 'Album', maxWidth: 200},
  { id: 'duration', label: 'Duration', align: 'right'}
];

interface Props {
  queryResults: (string | number)[],
  retrieveSongData: Function,
  setAllSongUris: Function,
  allSongUris: any,
  songIndex: any,
  setSongIndex: Function
}

const MusicList: React.FC<Props> = ({queryResults, retrieveSongData, setAllSongUris, songIndex, setSongIndex, allSongUris}) => {
  const uriList: string[] = []
  const uriListRef = React.useRef<string[]>([])

  const dropdownSongData = (uri: string[], artist: string, title: string, index: number) => {
    retrieveSongData(uri, artist, title, index)
    console.log(index)
  }

  const convertTime = (ms: number) => {
    let mins = Math.floor(ms/60000)
    let secs = ((ms % 60000) / 1000).toFixed(0)
    return (
      Number(secs) === 60 ?
      (mins + 1) + '.00' :
      mins + ':' + (Number(secs) < 10 ? '0' : '') + secs
    )
  }

  React.useEffect(() => {
    const uris = queryResults.map((song: any) => song.url)
    uriListRef.current = uris
    setAllSongUris(uris)
  }, [queryResults, setAllSongUris])

  const renderSmallestImage = (images: any) => {
    let returnedImage = images[0]
    for (let i = 1; i < images.length; i++) {
      if (images[i].height < returnedImage.height) returnedImage = images[i]
    }
    return returnedImage.url
  }

  const handleNextTrack = () => {
    console.log('next track now playing...')
    let nextIndex: number = songIndex + 1
    if (nextIndex >= queryResults.length) {
      nextIndex = 0
    }
    setSongIndex(nextIndex)
    const nextResult: any = queryResults[nextIndex]
    dropdownSongData(
      [uriListRef.current[nextIndex]],
      nextResult!.name!,
      nextResult!.artists![0]!.name!,
      nextIndex
    )
    const audioElement = document.getElementById(
      `audio-element-${nextIndex}`
    ) as HTMLAudioElement | null;
    if (audioElement instanceof HTMLAudioElement) {
      audioElement.play();
    }
  }

  return (
    <div className="music-container">
      {queryResults.length !== 0 && (
        <h1 className="text-white m-2">Search Results</h1>
      )}
      <div className="h-85v">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`${
                    column.minWidth ? 'w-' + column.minWidth + ' ' : ''
                  }${
                    column.maxWidth ? 'max-w-' + column.maxWidth + ' ' : ''
                  }font-bold text-blue-500 border-b-2 border-gray-200 py-2`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryResults.map((song: any, index: number) => {
              uriList.push(song.uri)
              return (
              <tr
                key={index}
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  dropdownSongData(
                    [song.uri],
                    song.name,
                    song.artists[0].name,
                    index
                  );
                }}
              >
                <td className="border-b-2 border-gray-200 py-2">
                  {index + 1}
                </td>
                <td className="border-b-2 border-gray-200 py-2">
                  <img
                    src={renderSmallestImage(song.album.images)}
                    alt="album placeholder"
                    className="h-8 w-8 mr-4 inline-block"
                  />
                  {song.name}
                </td>
                <td className="border-b-2 border-gray-200 py-2">
                  {song.artists
                    .map((artist: { name: string }, index: number) =>
                      index !== song.artists.length - 1
                        ? artist.name + ', '
                        : artist.name
                    )
                    .join('')}
                </td>
                <td className="border-b-2 border-gray-200 py-2">
                  {song.album.name}
                </td>
                <td className="border-b-2 border-gray-200 py-2 pr-4 text-right">
                  {convertTime(song.duration_ms)}
                  <audio
                    id={`audio-element-${index}`}
                    src={song.preview_url}
                    onEnded={handleNextTrack}
                  />
                </td>
              </tr>
            )
        })}
          </tbody>
        </table>
      </div>
    </div>
  );


  }

export default MusicList