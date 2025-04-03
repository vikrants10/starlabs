

// components/FilterDropdown.js
import React from 'react';

function FilterDropdown({ onCategoryChange }) {
  const handleChange = (e) => {
    onCategoryChange(e.target.value);
  };
  
  return (
    <div className="w-full">
      <select
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue="all"
      >
        <option value="all">All Categories</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="remote">Remote</option>
      </select>
    </div>
  );
}

export default FilterDropdown;