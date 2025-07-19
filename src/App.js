import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchCryptocurrencies } from './services/api';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });

  // Auto-refresh interval (30 minutes)
  const REFRESH_INTERVAL = parseInt(process.env.REACT_APP_REFRESH_INTERVAL) || 1800000;

  // Fetch cryptocurrency data
  const fetchData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError(null);
      
      const data = await fetchCryptocurrencies();
      
      setCoins(data.coins || []);
      setLastUpdated(data.lastUpdated || new Date().toISOString());
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch cryptocurrency data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh setup
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing data...');
      fetchData(false); // Don't show loader for auto-refresh
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [REFRESH_INTERVAL]);

  // Filter coins based on search term
  const filteredCoins = coins.filter(coin => 
    coin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort coins based on sort configuration
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const { key, direction } = sortConfig;
    const aValue = a[key] || 0;
    const bValue = b[key] || 0;

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchData();
  };

  if (loading && coins.length === 0) {
    return (
      <div className="app">
        <Header />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
        isLoading={loading}
      />
      
      <main className="main-content">
        {error && <ErrorMessage message={error} onRetry={handleRefresh} />}
        
        <Dashboard
          coins={sortedCoins}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;