import React from 'react';
import { Link } from 'react-router-dom';

const SearchMenu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">По номеру/ВИНу</Link></li>
        <li><Link to="/price-search">По цене</Link></li>
      </ul>
    </nav>
  );
};

export default SearchMenu;