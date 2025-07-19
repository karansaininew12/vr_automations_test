import React from 'react';
import { RefreshCw, Activity, Clock } from 'lucide-react';

const Header = ({ onRefresh, lastUpdated, isLoading }) => {
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Activity size={32} className="logo-icon" />
            <h1 className="logo-text">CryptoTracker</h1>
          </div>
          <span className="tagline">Real-time Cryptocurrency Dashboard</span>
        </div>
        
        <div className="header-right">
          <div className="last-updated">
            <Clock size={16} />
            <span>Updated: {formatLastUpdated(lastUpdated)}</span>
          </div>
          
          <button 
            onClick={onRefresh}
            className={`refresh-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} className={isLoading ? 'spinning' : ''} />
            {isLoading ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;