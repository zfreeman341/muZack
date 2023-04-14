import React, { useState } from 'react';

const Search: React.FC = () => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log('SEARCHING BABY')
  }
  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    console.log('submitted')
  }

  return (
    <form className="max-w-md mx-auto">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-5 h-5 my-auto text-dark-800 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for songs or artists"
          className="w-full py-2 pl-10 pr-4 text-gray-800 border border-gray-300 rounded-md outline-none bg-red-500 focus:bg-red-600 focus:border-orange-500"
        />
      </div>
    </form>
  );
}

export default Search;
