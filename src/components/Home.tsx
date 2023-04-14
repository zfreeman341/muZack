import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from '../logo/logo.png'
import Banner from './Banner'
import Playlists from './Playlists'
import Search from './Search'

const url = 'http://localhost:4000'

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
const Home: React.FC<HomePageProps> = ({authorizationCode}) => {



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

  const useAuth = (authorizationCode: string) => {

    useEffect(() => {
      console.log('in useAuth')
      axios.post('http://localhost:4000/auth', {
        authorizationCode: authorizationCode
      })
      .then(res => {
        console.log(res, '--------RES---------')
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
        axios.post('http://localhost:4000/refresh', {
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

    return accessToken
  }

  const token = useAuth(authorizationCode)
  useEffect(() => {
    console.log(token)
    console.log(authorizationCode)
  }, [token, authorizationCode])

  return (
    <div className="relative">
      <div  className="border border-bottom border-dark-800">
      <Banner/>
      </div>
  <div className="bg-dark-500 text-dark-700 h-screen border z-0 py-16"
  style={{backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 1}}
  >
    <div>
      <Search />
    <Playlists userInfo={userInfo} accessToken={accessToken} url={url}></Playlists>
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
