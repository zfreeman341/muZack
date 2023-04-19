// YOU GOT THIS BRO - KEEP GOING!
// READ THE AUTH LOG AND WATCH MORE VIDS
// LESS CHATGPT - USE FOR SMALLER PROBLEMS
// GET THE ACCESS TOKEN - THAT'S WHAT YOU'RE MISSING

const express = require('express')
const bodyParser = require ('body-parser')
const path = require('path')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const lyricsFinder = require('lyrics-finder')
const morgan = require('morgan')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const session = require('express-session')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const request = require('request') // request library
require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = function(length) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

const app = express()

let REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:4000'
const PORT = process.env.PORT || 4000;

app.use(express.static(path.resolve(__dirname, './build')))
app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
// app.use(corsProxy);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
// })
app.use((morgan('tiny')))

// -------- AUTHENTICATION ROUTE -----------
app.get('/login', function(req, res) {
  let state = generateRandomString(16)
  res.cookie(stateKey, state)

  // application requests authorization
  const scope = ['user-read-private', 'user-read-email', 'streaming'];
  res.set('Access-Control-Allow-Origin', '*') // Add this line to set the CORS header
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state
  })
  )
})

app.get('/callback', function(req, res) {
  // application requests refresh and access tokens after checking the state paramter
  const code = req.query.code || null;
  // const state = req.query.state || null;
  // const storedState = req.cookies ? req.cookies[stateKey] : null

  // if (state === null || state !== storedState) {
  //   res.redirect('/#' +
  //   querystring.stringify({
  //     error: 'state_mismatch'
  //   }))
  // } else
  // {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
       refresh_token = body.refresh_token
       const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {'Authorization': 'Bearer ' + access_token},
        json: true
       }
       // use access token to access Spotify web API
       request.get(options, (error, response, body) => {
        console.log('in body')
       })

       // pass the token to the browser to mak erequests
       res.redirect('/#' +
       querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
       }))
      } else {
        res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }))
      }
    })
  }
)

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(process.env.REACT_APP_CLIENT_ID+ ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// ----

app.post('/auth', (req, res) => {
  const code = req.body.authorizationCode;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || REDIRECT_URI
  })

  const userJSON = {}
  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      userJSON['expiresIn'] = data.body['expires_in']
      userJSON['accessToken'] = data.body['access_token']
      userJSON['refreshToken'] = data.body['refresh_token']
      spotifyApi.setAccessToken(data.body['access_token'])
      return spotifyApi.getMe()
    })
    .then(data => {
      userJSON['userId'] = data.body['id']
      userJSON['name'] = data.body['display_name']
      userJSON['email'] = data.body['email']

      const image = data.body.images[0].url
      userJSON['image'] = image
      userJSON['product'] = data.body['product']

      res.status(201).send(userJSON)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || REDIRECT_URI,
    refreshToken
  })
  spotifyApi.refreshAccessToken()
    .then(data => {
      console.log('The access token is refreshed')
      res.status(201).json({
        accessToken:data.body.access_token,
        expires_in: data.body.expires_in
      })
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

// endpoints for searches for music

app.get('/lyrics/:artist/:title', async (req,res) => {
  try {
    const lyrics = await lyricsFinder(req.params.artist, req.params.title) ||
    'No Lyrics Found';
    res.send(lyrics)
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
})

app.get('/tracks', async (req, res) => {
  try {
    const spotifyApi = new SpotifyWebApi({
      cliendId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(req.query.token)
    const getTracks = await spotifyApi.searchTracks(req.query.searchTerm)
    res.status(201).send(getTracks)
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
})

app.post('/playlist', async (req, res) => {
  try {
    const {accessToken, userId} = req.body
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(accessToken)

    const getPlaylists = await spotifyApi.getUserPlaylists(userId)
    res.status(201).send(getPlaylists)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/profile-artists', async (req, res) => {
  try{
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(req.body.accessToken)

    const getArtists = await spotifyApi.getFollowedArtists()
    res.status(201).send(getArtists)
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
})

app.post('/play-next-track', async (req, res) => {
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    });
    spotifyApi.setAccessToken(req.body.accessToken);
    // if (!playbackState || !playbackState.is_playing) {
    //   return res.sendStatus(404);
    // }

    const nextTrack = await spotifyApi.skipToNext();
    res.status(200).json({ success: true, nextTrack });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})