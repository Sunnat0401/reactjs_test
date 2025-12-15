import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, isInCart, onAddToCart }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image" 
        loading="lazy"
      />
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button 
            className={`btn btn-primary add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={onAddToCart}
            disabled={isInCart}
          >
            {isInCart ? '✓ In Cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;