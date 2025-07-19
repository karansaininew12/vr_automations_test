import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { formatCurrency, formatPercentage, formatMarketCap } from '../utils/formatters';
import './CoinTable.css';

const CoinTable = ({ coins, loading, sortConfig, onSort }) => {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? 
      <TrendingUp size={14} className="sort-icon active" /> : 
      <TrendingDown size={14} className="sort-icon active" />;
  };

  const getPriceChangeIcon = (change) => {
    return change >= 0 ? 
      <TrendingUp size={16} className="trend-icon positive" /> : 
      <TrendingDown size={16} className="trend-icon negative" />;
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-skeleton">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="skeleton-row">
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <div className="no-data">
        <h3>No cryptocurrency data available</h3>
        <p>Please try refreshing or check your connection</p>
      </div>
    );
  }

  return (
    <div className="coin-table-container">
      <table className="coin-table">
        <thead>
          <tr>
            <th 
              className="sortable"
              onClick={() => onSort('market_cap_rank')}
            >
              Rank {getSortIcon('market_cap_rank')}
            </th>
            <th>Coin</th>
            <th 
              className="sortable"
              onClick={() => onSort('current_price')}
            >
              Price {getSortIcon('current_price')}
            </th>
            <th 
              className="sortable"
              onClick={() => onSort('price_change_percentage_24h')}
            >
              24h Change {getSortIcon('price_change_percentage_24h')}
            </th>
            <th 
              className="sortable"
              onClick={() => onSort('market_cap')}
            >
              Market Cap {getSortIcon('market_cap')}
            </th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id || coin.coinId} className="coin-row">
              <td className="rank">
                #{coin.market_cap_rank}
              </td>
              
              <td className="coin-info">
                <div className="coin-details">
                  <img 
                    src={coin.image} 
                    alt={coin.name}
                    className="coin-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-coin.png';
                    }}
                  />
                  <div className="coin-names">
                    <span className="coin-name">{coin.name}</span>
                    <span className="coin-symbol">{coin.symbol?.toUpperCase()}</span>
                  </div>
                </div>
              </td>
              
              <td className="price">
                {formatCurrency(coin.current_price)}
              </td>
              
              <td className={`change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                <div className="change-container">
                  {getPriceChangeIcon(coin.price_change_percentage_24h)}
                  {formatPercentage(coin.price_change_percentage_24h)}
                </div>
              </td>
              
              <td className="market-cap">
                {formatMarketCap(coin.market_cap)}
              </td>
              
              <td className="last-updated">
                {new Date(coin.last_updated).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
