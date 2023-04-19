import React from 'react'
import {FaMusic, FaList, FaMicrophone} from 'react-icons/fa'

interface Props {
  renderSidebarItem: Function
}

const Sidebar: React.FC<Props> = ({renderSidebarItem}) => {
  const SidebarItems = ['Songs', 'Lyrics', 'Playlists']

  const renderSidebarIcons = (item: string) => {
    if (item === 'Songs') return <FaMusic />
    if (item === 'Lyrics') return <FaMicrophone />
    if (item === 'Playlists') return <FaList />
  }
  return(
    <div className="w-1/12 h-screen flex flex-col justify-center items-center">
      {SidebarItems.map((item: string, index: number) => (
        <div
        key={index}
        className="font-sans text-white mt-6 text-center cursor-pointer hover:text-dark-800"
        onClick={() => renderSidebarItem(item)}
        >
        {renderSidebarIcons(item)}
        <p className="mt-2">{item}</p>
        </div>
      ))}
    </div>
  )
}

export default Sidebar