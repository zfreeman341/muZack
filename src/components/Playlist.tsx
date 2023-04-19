import React from 'react';
import axios from 'axios';

interface Props {
  name: string,
  image: {url:string}[],
  tracks: {total: number},
  accessToken: string
  songUri: string[],
  setSongUri: Function,
  playlistId: string,
  setShowPlaylists: Function
}

const Playlist: React.FC<Props> = ({name, image, tracks, accessToken, songUri, setSongUri, playlistId, setShowPlaylists}) => {

  const playPlaylist = async () => {
    try {
      const response = await axios.post('/playplaylist', {
        accessToken,
        playlistId
      });
      const { tracks } = response.data;
      if (tracks.length > 0) {
        setSongUri(tracks.map((track: any) => track.uri));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg" onClick={playPlaylist}>
      {image.length > 0 && <img src={image[0].url} alt='playlist--cover' className="object-cover h-32 w-32"/>}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <p className="text-white text-center font-bold text-lg mb-2">{name}</p>
        <p className="text-white text-center text-sm">{tracks.total} Tracks</p>
      </div>
    </div>
  )
}

export default Playlist;
