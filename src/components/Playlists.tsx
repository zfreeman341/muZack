import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Playlist from './Playlist';

type UserInfo = {
  userId: string,
  username: string,
}

interface Props{
  userInfo: UserInfo,
  accessToken: string,
  url: string,
  songUri: string[],
  setSongUri: Function,
  setShowPlaylists: Function
}

const Playlists: React.FC<Props>=({userInfo, accessToken, url, songUri, setSongUri, setShowPlaylists}) => {
  const [userPlaylists, setUserPlaylists] = React.useState<any>([]);
  const [playlistTracks, setPlaylistTracks] = useState<any>([]);
  const [showPlaylistCards, setShowPlaylistCards] = useState<boolean>(true)
  const [playlistName, setPlaylistName] = useState<string>('')
  const [playlistImage, setPlaylistImage] = useState<string>('')

  React.useEffect(() => {
    if(!userInfo) return setUserPlaylists([]);

    let userId = userInfo.userId;
    let playlistReqBody = {accessToken, userId};

    axios.post(`${url}/playlist`,
    playlistReqBody
    )
    .then(res => {
      setUserPlaylists(res.data.body.items)
    })
    .catch(err => console.error(err))
  }, [userInfo, accessToken, url]);


  useEffect(() => {
    console.log(userPlaylists)
  }, [userPlaylists])

  const playlistReturnHandler = () => {
    setShowPlaylistCards(true)
  }


  return (
    <div className="container mx-auto px-4 py-6 z-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userPlaylists.length > 0 && showPlaylistCards === true ? (
          userPlaylists.map((playlist: any, index: number) => (
            <div>
            <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
            <Playlist
              key={index}
              name={playlist.name}
              image={playlist.images}
              tracks={playlist.tracks}
              accessToken={accessToken}
              playlistId={playlist.id}
              setShowPlaylists={setShowPlaylists}
              setPlaylistTracks={setPlaylistTracks}
              setSongUri={setSongUri}
              setShowPlaylistCards={setShowPlaylistCards}
              setPlaylistName={setPlaylistName}
              setPlaylistImage={setPlaylistImage}
            />
            </div>
          ))
        ) : (
          null
        )}
      </div>
      {playlistTracks.length > 0 ? (
<div className="w-full mt-6 overflow-y-scroll h-[calc(100vh-15rem)]">
  <h1 className="justify-center font-bold">{playlistName}</h1>
  <div className="w-full">
    <table className="w-full" style={{ tableLayout: "fixed" }}>
      <thead>
        <tr className="border-b border-gray-800">
          <th className="text-left text-xs font-semibold text-dark-700 uppercase tracking-wider px-4 py-3">#</th>
          <th className="text-left text-xs font-semibold text-dark-700 uppercase tracking-wider px-4 py-3">Title</th>
          <th className="text-left text-xs font-semibold text-dark-700 uppercase tracking-wider px-4 py-3">Artist</th>
          <th className="text-left text-xs font-semibold text-dark-700 uppercase tracking-wider px-4 py-3">Album</th>
        </tr>
      </thead>
      <tbody>
        {playlistTracks.map((track: any, index: number) => (
          <tr key={track.id} className="hover:bg-gray-900">
            <td className="border text-sm text-dark-700 px-4 py-3">{index + 1}</td>
            <td className="border text-sm font-semibold text-dark-700 px-4 py-3">{track.name}</td>
            <td className="border text-sm text-dark-700 px-4 py-3">{track.artist}</td>
            <td className="border text-sm text-dark-700 px-4 py-3">{track.album}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      ) : (
      null
      )}
    </div>
  );

}

export default Playlists;