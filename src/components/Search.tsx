import React, { useState, useCallback } from 'react';
// import debounce from 'lodash.debounce';

interface Props {
  changeQueryState: Function
}

const Search: React.FC<Props> = ({changeQueryState}) => {

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    changeQueryState(event.currentTarget.value)
  }

  // const delayedQuery = useCallback(
  //   debounce((q) => changeQueryState(q), 300), []
  // )

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
          onChange={handleChange}
          className="w-full py-2 pl-10 pr-4 text-dark-700 border border-gray-300 rounded-md outline-none bg-dark-800 focus:bg-red-800 focus:border-dark-400"
        />
      </div>
    </form>
  );
}

export default Search;
