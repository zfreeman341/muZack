import React from 'react';
import axios from 'axios';
import Playlist from './Playlist';

type UserInfo = {
  userId: string,
  username: string,
}

interface Props{
  userInfo: UserInfo,
  accessToken: string,
  url: string
}

const Playlists: React.FC<Props>=({userInfo, accessToken, url}) => {
  const [userPlaylists, setUserPlaylists] = React.useState<any>([]);

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



  return(
    <div className="container mx-auto px-4 py-6 z-0">
      <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userPlaylists.length > 0 ? (
        userPlaylists.map((playlist: any, index: number) => (
          <Playlist
            key={index}
            name={playlist.name}
            image={playlist.images}
            tracks={playlist.tracks}
          />
        ))
      ) : (
        <p>Loading Playlists...</p>
      )}
    </div>
    </div>
  )
}

export default Playlists;
