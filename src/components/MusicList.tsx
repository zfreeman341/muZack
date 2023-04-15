import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  row: {
    '&:hover': {
      background: '#333333'
    }
  },
  cell: {
    borderBottom: 'none'
  },
  cellFlexBox: {
    borderBotton: 'none',
    display: 'flex',
    alignItem: 'center'
  }
})

  interface Column {
    id: 'index' | 'title' | 'artist' | 'album' | 'duration'
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: 'index', label: '#'},
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'artist', label: 'Artist', maxWidth: 100},
    { id: 'album', label: 'Album', maxWidth: 200},
    { id: 'duration', label: 'Duration', align: 'right'}
  ];

  interface Props {
    queryResults: (string | number)[],
    retrieveSongData: Function
  }


  const MusicList: React.FC<Props> = ({queryResults, retrieveSongData}) => {
    const classes = useStyles()

  const dropdownSongData = (uri: string, artist: string, title: string) => {
    retrieveSongData(uri, artist, title)
  }

  const convertTime = (ms: number) => {
    let mins = Math.floor(ms/60000)
    let secs = ((ms % 60000) / 1000).toFixed(0)
    return (
      Number(secs) === 60 ?
      (mins + 1) + '.00' :
      mins + ':' + (Number(secs) < 10 ? '0' : '') + secs
    )
  }

  const renderSmallestImage = (images: any) => {
    let returnedImage = images[0]
    for (let i = 1; i < images.length; i++) {
      if (images[i].height < returnedImage.height) returnedImage = images[i]
    }
    return returnedImage.url
  }

    return (
      <div className="music-container">
        {queryResults.length !== 0 && (
          <h1 className="text-white m-2">Search Results</h1>
        )}
        <div className="h-85v">
          <table className="w-full table-auto">
            <thead className="bg-gray-800 text-sm text-gray-400 uppercase">
              <tr>
                {columns.map((column, index) => (
                  <th
                  key={index}
                  className={`py-3 px-6 text-left border-b border-gray-600 ${column.minWidth && "min-w-" + column.minWidth}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-400 text-sm font-light">
            {queryResults.map((song: any, index: number) => (
              <tr
              key={index}
              className="hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                dropdownSongData(song.uri, song.name, song.artists[0].name)
              }
            }
              >
                <td className="py-3 px-6 border-b border-gray-600">
                  {index + 1}
                </td>
                <td className="flex items-center py-3 px-6 border-b border-gray-600">
                  <img
                  src={renderSmallestImage(song.album.images)}
                  alt="album placeholder"
                  className="h-8 w-8 mr-4"
                  ></img>
                  {song.name}
                </td>
            <td className="py-3 px-6 border-b border-gray-600">
                {song.artists.map((artist: { name: string }, index: number) =>
                  index !== song.artists.length - 1
                  ? artist.name + ", "
                  : artist.name
                  )}
            </td>
            <td className="py-3 px-6 border-b border-gray-600">
              {song.album.name}
            </td>
            <td className="py-3 px-6 border-b border-gray-600 text-right">
              {convertTime(song.duration_ms)}
            </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

export default MusicList