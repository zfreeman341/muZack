import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from '../logo/logo.png'
import Banner from './Banner'
import Playlists from './Playlists'
import Search from './Search'
import MusicList from './MusicList'
import MusicPlayer from './MusicPlayer'
import Lyrics from './Lyrics'
import Profile from './Profile'
import Profilepage from './Profilepage'
import Sidebar from './Sidebar'

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

  // interface QueryResult {
  //   name: string;
  //   arists: {name: string}
  // }
    // set search result list
  const [query, setQuery] = useState<string>('')
  const [queryResults, setQueryResults] = useState<any>([])
  const [songUri, setSongUri] = useState<string[]>([])
  const [songArtist, setSongArtist] = useState<string>('')
  const [songTitle, setSongTitle] = useState<string>('')
  const [songIndex, setSongIndex] = useState<any>(0)
  const [allSongUris, setAllSongUris] = useState<string[]>([])

  // which components to be rendered
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true)
  const [showMusicList, setShowMusicList] = useState<boolean>(true)
  const [showLyrics, setShowLyrics] = useState<boolean>(true)
  const [showProfile, setShowProfile] = useState<boolean>(true)

  const useAuth = (authorizationCode: string) => {

    useEffect(() => {
      axios.post('http://localhost:4000/auth', {
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
  // useEffect(() => {
  //   console.log(token)
  //   console.log(authorizationCode)
  // }, [token, authorizationCode])

  useEffect(() => {
    if (!query) return setQueryResults([])
    if (!(token as any)) return

    let cancel = false

    axios.get(`${url}/tracks`, {
      params: {
        token: token,
        searchTerm: query
      }
    })
      .then(res => {
        if (cancel) return
        setQueryResults(res?.data?.body?.tracks?.items)
      })
      .catch(err => console.error(err))

      return () => {
        (cancel = true)
      }
  }, [query, token])

  const changeQueryState = (searchValue: string) => {
    setQuery(searchValue)
  }

  const retrieveSongData = (uri: string[], artist: string, title: string, index: number) => {
    setSongUri(uri);
    setSongArtist(artist)
    setSongTitle(title)
    setSongIndex(index)
  }

  const renderSidebarItem = (item: string) => {
    if (item === 'Songs') {
      setShowMusicList(true)
      setShowProfile(false)
      setShowLyrics(false)
      setShowPlaylists(false)
    } else if (item === 'Lyrics') {
      setShowMusicList(false)
      setShowProfile(false)
      setShowLyrics(true)
      setShowPlaylists(false);
    } else {
      setShowMusicList(false)
      setShowProfile(false)
      setShowLyrics(false)
      setShowPlaylists(true)
    }
  }

  const renderProfilePage =() => {
    setShowProfile(true)
    setShowMusicList(false)
    setShowLyrics(false)
    setShowPlaylists(false)
  }


  return (
    <div className="relative overflow-auto" style={{background: `url(${logo}) repeat center`, backgroundSize: 'cover'}}>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-1 h-full bg-gray-500">
          <Sidebar renderSidebarItem={renderSidebarItem} />
        </div>
        <div className="col-span-11">
          <div className="border border-bottom border-dark-800">
            <Banner/>
          </div>
          <div className="text-dark-700 h-screen border py-16">
            <div className="text-dark-700" style={{minHeight: '100vh', backgroundAttachment: 'scroll'}}>
              <Search changeQueryState={changeQueryState} setSongUri={setSongUri} />
              <Profile userInfo={userInfo}></Profile>
              {showMusicList &&
                <MusicList queryResults={queryResults} retrieveSongData={retrieveSongData} setAllSongUris={setAllSongUris} songIndex={songIndex} setSongIndex={setSongIndex} allSongUris={allSongUris}></MusicList>
              }
              {showLyrics &&
                <Lyrics
                artist={songArtist}
                title={songTitle}
                url={url}
                />
              }
              <div className="relative">
                {showPlaylists &&
                  <div className="z-40">
                    <Playlists userInfo={userInfo} accessToken={token} url={url}></Playlists>
                  </div>
                }
                <div className="mt-16 z-100">
                  <div>
                    {showProfile &&
                    <Profilepage
                    userInfo={userInfo}
                    accessToken={accessToken}
                    url={url}
                    />
                    }
                  </div>
                  <div className="mt-8">
                  <MusicPlayer songUri={songUri} token={token} setSongIndex={setSongIndex} songIndex={songIndex} setQueryResults={setQueryResults} queryResults={queryResults} retrieveSongData={retrieveSongData}></MusicPlayer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}

export default Home
