import React from 'react';
import CoinTable from './CoinTable';
import SearchBar from './SearchBar';
import SortControls from './SortControls';
import Stats from './Stats';


const Dashboard = ({ 
  coins, 
  loading, 
  searchTerm, 
  onSearchChange, 
  sortConfig, 
  onSort 
}) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Cryptocurrency Dashboard</h1>
        <Stats coins={coins} />
      </div>

      <div className="dashboard-controls">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search cryptocurrencies..."
        />
        
        <SortControls 
          sortConfig={sortConfig}
          onSort={onSort}
        />
      </div>

      <CoinTable 
        coins={coins}
        loading={loading}
        sortConfig={sortConfig}
        onSort={onSort}
      />
    </div>
  );
};

export default Dashboard;