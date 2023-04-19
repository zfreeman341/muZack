import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Badge} from 'react-daisyui'


type UserInfo = {
  username: string,
  email: string,
  image: string,
  product: string
}

interface Props{
  userInfo :UserInfo,
  accessToken: string,
  url: string
}

const Profilepage: React.FC<Props> = ({userInfo, accessToken, url}) => {
  const [followedArtists, setFollowedArtists] = useState<any>([])

  useEffect(() => {
    console.log(accessToken, '-----ACCESSTOKEN-------')
    console.log(userInfo, '-----USERINFO------')
    if (!userInfo) return

    axios.post(`${url}/profile-artists`, {accessToken})
    .then(res => {
      console.log(res.data.body)

      setFollowedArtists(res.data.body.artists.items)
    })
    .catch(err => console.error(err))
  }, [userInfo, accessToken, url])

return(
  <div className="text-white">
    <div className="flex flex-row items-center justify-center space-x-4 py-8 px-4 md:py-16 md:px-16">
      <img
      src={userInfo.image}
      alt = 'profile'
      className="rounded-full h-40 w-40 md:h-60 md:w-60"
      />
      <div className="text-left">
        <h1 className="text-3xl text-white md:text-6xl font-bold">{userInfo.username}</h1>
        <p className="text-base md:text-lg">{followedArtists.length} Artists Following</p>
      </div>
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-center py-4 md:py-8">
      <div className="carousel py-4 md:py-8">
        <div className="carousel-inner"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
        >
          {followedArtists.map((artist: any) => (
            <div key={artist.id} className="carousel-item p-2 md:p-4 pb-8">
              <div className="rounded-full h-32 w-32 md:h-48 md:w-48 overflow-hidden flex items-center justify-center">
              <img
              src={artist.images[2].url}
              alt="followed-artist"
              className="h-full w-full object-cover"
              />
               </div>
            <div className="text-center mt-4">
              <p className="text-lg md-text-xl font-bold">{artist.name}</p>
              <Badge style={{fontSize: '24px'}}>{artist.followers.total} Followers</Badge>
            </div>
            </div>
          ))}
        </div>
      </div>
    </h1>
  </div>
)

}

export default Profilepage