import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-lines">
        <div className="blue-line"></div>
        <div className="yellow-line"></div>
      </div>
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">База Даi 2024</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><Link to="/">Number/VinCode</Link></li>
            <li><Link to="/price">Price</Link></li>
            <li><Link to="/make-model">MakeModel</Link></li>
            <li><Link to="/region">Region</Link></li>
            <li><Link to="/compare">Compare</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;