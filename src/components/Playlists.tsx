import React, {useState, useEffect} from 'react';
import axios from 'axios'

type UserInfo = {
  userId: string,
  username: string
}

interface Props{
  userInfo: UserInfo,
  accessToken: string
}

const Playlists: React.FC<Props>=({userInfo, accessToken}) => {
  const [userPlaylists, setUserPlaylists] = useState<any>([])

  return(
    <div className="border border-red-500">
      <h1>HERE WE ARE</h1>
    </div>
  )
}

export default Playlists