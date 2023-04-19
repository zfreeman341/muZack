import React from 'react'
import { FaMusic, FaList, FaMicrophone } from 'react-icons/fa'

interface Props {
  renderSidebarItem: Function
}

const Sidebar: React.FC<Props> = ({ renderSidebarItem }) => {
  const SidebarItems = ['Songs', 'Lyrics', 'Playlists']

  const renderSidebarIcons = (item: string) => {
    if (item === 'Songs') return <FaMusic />
    if (item === 'Lyrics') return <FaMicrophone />
    if (item === 'Playlists') return <FaList />
  }

  return (
    <div className="w-24 h-screen flex flex-col justify-center bg-gray-800 text-dark-800">
      {SidebarItems.map((item: string, index: number) => (
        <div key={index} className="sidebar-item my-2 flex items-center pl-2">
          <div
            className="font-sans text-left cursor-pointer flex-1 ml-8"
            onClick={() => renderSidebarItem(item)}
          >
            {renderSidebarIcons(item)}
            <p className="mt-1">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
