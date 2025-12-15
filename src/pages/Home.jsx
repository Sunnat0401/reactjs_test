import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import CartItem from '../components/CartItem/CartItem';
import './Home.css';

const Home = ({ cart, addToCart, removeFromCart, updateQuantity, handleCheckout, cartSummary }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log(data)
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="marketplace-grid">
        {/* Products Section */}
        <section className="products-section">
          <div className="section-header">
            <h2>Products</h2>
            <div className="filter-controls">
              <select 
                id="categoryFilter" 
                className="filter-select"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
              >
                <option value="all">All Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={cart.some(item => item.id === product.id)}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Cart Section */}
        <section className="cart-section">
          <div className="section-header">
            <h2>Cart</h2>
          </div>
          
          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <p>Your cart is empty.</p>
                <small>Click the "Add to cart" button to purchase products.</small>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onDecrease={() => updateQuantity(item.id, -1)}
                    onIncrease={() => updateQuantity(item.id, 1)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="cart-total">
              <div className="cart-summary-details">
                <div className="summary-row">
                  <span>Total products:</span>
                  <span>{cartSummary}</span>
                </div>
                <div className="summary-row total">
                  <span>Total amount:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn btn-checkout" onClick={handleCheckout}>
                Shopping
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;