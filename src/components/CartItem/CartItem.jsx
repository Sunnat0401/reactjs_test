import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onDecrease, onIncrease }) => {
  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.title} 
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button 
              className="quantity-btn decrease-btn"
              onClick={onDecrease}
            >
              −
            </button>
            <span className="quantity-value">{item.quantity}</span>
            <button 
              className="quantity-btn increase-btn"
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <button 
            className="btn btn-danger remove-btn"
            onClick={onRemove}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;