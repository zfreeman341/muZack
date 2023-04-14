import React from 'react'
import logo from '../logo/logo.png'

const Banner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-dark-500 py-2 flex justify-start items-center z-10">
      <img src={logo} alt="Logo" className="h-8 ml-4"></img>
      <h1 className="text-dark-800 text-lg font-bold mx-auto">MuZack</h1>
    </div>
  )
}

export default Banner