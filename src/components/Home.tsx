import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from '../logo/logo.png'
import Banner from './Banner'
import Playlists from './Playlists'

type HomePageProps = {
  authorizationCode: string
}

export interface UserInfo {
  userId: string,
  username: string,
  email: string,
  image: string,
  product: string
}

const useAuth = (authorizationCode: string) => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: '',
    username: '',
    email: '',
    image: '',
    product: ''
  });

  useEffect(() => {
    axios.post('http://localhost:3000/auth', {
      authorizationCode: authorizationCode
    })
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        userId: res.data.userId,
        username: res.data.name,
        email: res.data.email,
        image: res.data.image,
        product: res.data.product
      }));
      (window as any).history.pushState({}, null, '/home');
    })
    .catch((error) => {
      // (window as any).location = '/'
      console.log(error)
    })
  },[authorizationCode])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const intervalCall = setInterval(() => {
      axios.post('http://localhost:3000/refresh', {
        refreshToken
      })
      .then(res => {
        console.log(res)
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
      .catch(() => {
        (window as any).location = '/'
      })
    }, (expiresIn - 60) * 1000)
    return () => clearInterval(intervalCall)
  }, [refreshToken, expiresIn])

  return { accessToken, userInfo }
}

const Home: React.FC<HomePageProps> = ({authorizationCode}) => {

  const { accessToken, userInfo } = useAuth(authorizationCode)



  return (
    <div className="relative">
      <Banner />
  <div className="bg-dark-500 text-dark-700 h-screen border z-0" style={{backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.8}}>
    <div>
    <Playlists userInfo={userInfo} accessToken={accessToken}></Playlists>
    </div>
    <div className="flex justify-center items-center h-screen">
      <p className="text-dark-800 font-semibold text-xl">
      </p>
    </div>
  </div>
  <div>

  </div>
  </div>
  )
}

export default Home
