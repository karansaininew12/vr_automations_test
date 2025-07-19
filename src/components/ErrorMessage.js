import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <AlertCircle size={24} className="error-icon" />
        <div className="error-text">
          <h3>Something went wrong</h3>
          <p>{message}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;