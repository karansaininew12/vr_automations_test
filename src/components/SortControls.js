import React from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

const SortControls = ({ sortConfig, onSort }) => {
  const sortOptions = [
    { key: 'market_cap_rank', label: 'Rank' },
    { key: 'current_price', label: 'Price' },
    { key: 'price_change_percentage_24h', label: '24h Change' },
    { key: 'market_cap', label: 'Market Cap' },
    { key: 'name', label: 'Name' }
  ];

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={16} />;
    }
    return sortConfig.direction === 'asc' ? 
      <TrendingUp size={16} /> : 
      <TrendingDown size={16} />;
  };

  return (
    <div className="sort-controls">
      <span className="sort-label">Sort by:</span>
      <div className="sort-buttons">
        {sortOptions.map(option => (
          <button
            key={option.key}
            onClick={() => onSort(option.key)}
            className={`sort-button ${sortConfig.key === option.key ? 'active' : ''}`}
          >
            {getSortIcon(option.key)}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;