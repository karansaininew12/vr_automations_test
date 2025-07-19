import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-results-info">
          Searching for: <strong>{searchTerm}</strong>
        </div>
      )}
    </div>
  );
};

export default SearchBar;