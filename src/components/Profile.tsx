import React, { useState } from 'react';

type UserInfo = {
  username: string;
  email: string;
  image: string;
  product: string;
};

interface Props {
  userInfo: UserInfo;
}

const Profile: React.FC<Props> = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const renderProfilePage = () => {
    console.log('clicked!');
    // to be replaced
  };

  return (
    <div className="flex items-center justify-end mr-8">
      <p className="text-sm text-white uppercase mr-4">{userInfo.product}</p>
      <button className="relative text-left focus:outline-none" onClick={handleOpen}>
        <img className="h-10 w-10 rounded-full mr-2" src={userInfo.image} alt="profile-pic" />
        <span className="text-white text-sm">{userInfo.username}</span>
        {isOpen && (
          <div className="absolute top-12 right-0 w-48 bg-dark-400 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                onClick={renderProfilePage}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Profile;
