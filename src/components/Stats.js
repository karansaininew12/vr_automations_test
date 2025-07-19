import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency, formatMarketCap } from '../utils/formatters';

const Stats = ({ coins }) => {
  if (!coins || coins.length === 0) {
    return null;
  }

  // Calculate statistics
  const totalMarketCap = coins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  const positiveChanges = coins.filter(coin => coin.price_change_percentage_24h >= 0).length;
  const negativeChanges = coins.length - positiveChanges;
  const avgChange = coins.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0) / coins.length;

  const highestPrice = Math.max(...coins.map(coin => coin.current_price || 0));
  const lowestPrice = Math.min(...coins.map(coin => coin.current_price || 0));

  return (
    <div className="stats">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">
            <BarChart3 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Market Cap</span>
            <span className="stat-value">{formatMarketCap(totalMarketCap)}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon positive">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Gainers</span>
            <span className="stat-value positive">{positiveChanges}/{coins.length}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon negative">
            <TrendingDown size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Losers</span>
            <span className="stat-value negative">{negativeChanges}/{coins.length}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <BarChart3 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Avg 24h Change</span>
            <span className={`stat-value ${avgChange >= 0 ? 'positive' : 'negative'}`}>
              {avgChange.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-content">
            <span className="stat-label">Price Range</span>
            <span className="stat-value">
              {formatCurrency(lowestPrice)} - {formatCurrency(highestPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;