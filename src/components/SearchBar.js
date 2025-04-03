import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;