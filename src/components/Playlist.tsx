import React from 'react';

interface Props {
  name: string,
  image: {url:string}[],
  tracks: {total: number}
}

const Playlist: React.FC<Props> = ({name, image, tracks}) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {image.length > 0 && <img src={image[0].url} alt='playlist--cover' className="object-cover h-32 w-32"/>}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <p className="text-white text-center font-bold text-lg mb-2">{name}</p>
        <p className="text-white text-center text-sm">{tracks.total} Tracks</p>
      </div>
    </div>
  )
}

export default Playlist
