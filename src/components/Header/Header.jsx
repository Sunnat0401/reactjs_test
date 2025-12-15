import React from 'react';
import './Header.css';

const Header = ({ cartSummary }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">🛒 Mini Marketplace</h1>
        <div className="header-info">
          <span className="cart-summary">Cart: {cartSummary} items</span>
        </div>
      </div>
    </header>
  );
};

export default Header;