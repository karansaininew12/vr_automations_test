import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2024 CryptoTracker. Built with React & Node.js</p>
          <p className="data-source">
            Data provided by{' '}
            <a 
              href="https://www.coingecko.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              CoinGecko API
              <ExternalLink size={12} />
            </a>
          </p>
        </div>
        
        <div className="footer-right">
          <a 
            href="https://github.com/yourusername/crypto-tracker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View source code on GitHub"
          >
            <Github size={20} />
            <span>View Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
