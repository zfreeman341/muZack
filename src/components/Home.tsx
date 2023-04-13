import React from "react";

type HomePageProps = {
  authorizationCode: string
}

const Home: React.FC<HomePageProps> = ({authorizationCode}) => {
  return <div className="bg-0A0A0A text-white h-screen">
    <h1 className="text-4xl font-bold text-27BD5C text-center py-10">
      Welcome to MuZack
    </h1>
    <div className="flex justify-center items-center h-full">
      <p className="text-846653 font-semibold text-xl">
        Welcome to MuZack! Your one stop music shop. -By Zack
      </p>
    </div>
  </div>
}

export default Home