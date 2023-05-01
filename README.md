# MuZack

![MuZack Placeholder](./public/logo.png)

MuZack is a feature rich, responsive web application built using Typescript and React. I started this project as a fun way to expand my TypeScript knowledge, and to create a personalized, one-stop music app. This app seamlessly integrates with the Spotify API to provide an engaging music discovery experience. This app will eventually feature integration with the Songkick API, to display and play concert setlists for your favorite artists.

## Features
- Browse popular playlists and discover new music using the Spotify API.
- Search for your favroite songs and artists.
- Create and display personalized playlists.
- Access and manage your Spotify playlists and library.
- [TO COME] search popular artists and playlists using the Spotify API.
- [TO COME] search concert setlists usings the Songkick API and play those setlists through Spotify.

## Getting Started

These instructions will help you get a copy of the project running on your local machine.

### Prerequisites

To run this project, you will need the following installed on your local machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:

``` git clone https://github.com/zfreeman341/muZack.git```

2. Install the dependencies:
``` npm install ```

3. Create a `.env` file in the project root with the following envrionmental variables:

``` PORT=4000
REACT_APP_CLIENT_ID= XXX [from Spotify Developers Tab]
REACT_APP_CLIENT_SECRET=XXX [from Spotfiy Developers Tab]
REACT_APP_REDIRECT_URI=http://localhost:4000
```

Replace the placeholders wtih your Spotify API credentials.

4. Create a production-ready build of the application as needed:

``` npm run build ```

5. Run the server on your specified port:

``` npm run server-dev ```