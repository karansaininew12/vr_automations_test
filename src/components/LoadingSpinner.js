import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading cryptocurrency data...' }) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <Loader2 className="spinner-icon" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;


