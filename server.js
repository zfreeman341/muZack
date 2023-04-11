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
require('dotenv').config()

const app = express()

let REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000'
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, './build')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((morgan('combined')))
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}))

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: REDIRECT_URI + '/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      done(null, profile)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

app.post('/auth', (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: REDIRECT_URI
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
      res.status(500).send(err)
    })
})

app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog:true
}))

app.get('auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: '/login'}),
  function(req, res) {
    // build homepage?
    res.direct('/')
  }
)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})