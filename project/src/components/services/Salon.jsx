import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';

// Import images
import saloncar from '../../salon-car.webp';
import cart1 from '../../cart1.png';
import next from '../../salonnext.webp';
import quality from '../../salonquality.webp';
import ViewCart from '../../ViewCart';

function SalonPage() {
  const [packageCount, setPackageCount] = useState(0);
  const [products, setProducts] = useState([]); // State to store product data
  const pricePerPackage = 848;
  const originalPricePerPackage = 1038;

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const incrementCount = () => {
    setPackageCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setPackageCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const currentTotalPrice = packageCount * pricePerPackage;
  const originalTotalPrice = packageCount * originalPricePerPackage;

  return (
    <div className="salon-container-updated">
      <div className="salon-header-updated">
        <h1>Salon for women</h1>
        <div className="rating-updated">
          <span className="rating-badge-updated">4.85</span>
          <span className="review">1.0 M reviews</span>
        </div>
      </div>

      <div className="services-section-updated">
        <h3>Select a service</h3>
        <div className="services-grid-updated">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/${product.mainCategory.toLowerCase().replace(/ /g, '-')}`}
              className="service-item-updated"
            >
              <img
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.mainCategory}
                className="service-image-updated"
              />
              <p className="salonpara">{product.mainCategory}</p>
              <span className={`status-badge ${product.status === 'Available' ? 'available' : 'out-of-stock'}`}>
                {product.status}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="banner-section-updated">
        <div className="banner-updated">
          <img src={saloncar} alt="Advanced tools & ingredients" className="banner-image-updated" />

          <div className="abox">
            <div className="package-container">
              <h2>Packages</h2>
              <div className="package-card">
                <div className="package-header">
                  <h3>Complete honey waxing</h3>
                  <div className="rating-section"></div>
                </div>
                <div className="package-details">
                  <p className="price">
                    <span className="current-price">₹848</span>
                    <span className="original-price">₹1038</span>
                    <span className="rating">4.85</span>
                    <span className="reviews">(1.9M reviews)</span>
                  </p>
                  <p className="time">1 hr 10 mins</p>
                  <ul className="features">
                    <li>
                      <strong>Waxing:</strong> Full arms (including underarms), Full legs (no bikini and no brazilian)
                    </li>
                    <li>
                      <strong>Facial hair removal:</strong> Eyebrow, Upper lip
                    </li>
                  </ul>
                </div>
                <div className="quantity-control">
                  <button className="decrement-button" onClick={decrementCount}>
                    -
                  </button>
                  <span className="quantity">{packageCount}</span>
                  <button className="increment-button" onClick={incrementCount}>
                    +
                  </button>
                </div>
                <button className="edit-button">Edit your package</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-info-container">
        {packageCount === 0 ? (
          <div className="cart-empty-section">
            <img src={cart1} alt="Cart is empty" className="cart-image" />
            <p className="cart-text">No items in your cart</p>
          </div>
        ) : (
          <div className="cart-full-section">
            <h3>Cart</h3>
            <div className="cart-item">
              <div className="cart-item-header">
                <span>Complete honey waxing</span>
                <div className="cart-item-price">
                  <span className="current-price">₹{currentTotalPrice}</span>
                  <span className="original-price">₹{originalTotalPrice}</span>
                </div>
              </div>
              <div className="cart-item-details">
                <ul>
                  <li>Full arms + underarms (Honey)</li>
                  <li>Full legs (Honey)</li>
                  <li>Threading: Eyebrow</li>
                  <li>Threading: Upper lip</li>
                  <li>Full Legs chocolate roll-on</li>
                </ul>
              </div>
              <button className="edit-button">Edit</button>
            </div>
            <Link to="/Viewcart">
              <button className="view-cart-button">₹{currentTotalPrice} View Cart</button>
            </Link>
          </div>
        )}
        <div className="offer-section">
          <div className="offer-icon">
            <img src={next} alt="Plus icon" className="plus-icon" />
          </div>
          <div className="offer-details">
            <p className="offer-title">Save 10% on every order</p>
            <p className="offer-subtitle">Get Plus now</p>
          </div>
        </div>

        <div className="promise-section">
          <h3 className="promise-title">UC Promise</h3>
          <ul className="promise-list">
            <li>
              <TiTick />4.5+ Rated Beauticians
            </li>
            <li>
              <TiTick />Luxury Salon Experience
            </li>
            <li>
              <TiTick />Premium Branded Products
            </li>
          </ul>
          <img src={quality} alt="Quality Assured" className="quality-assured-icon" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SalonPage />} />
      <Route path="/packages" element={<div>Packages Page</div>} />
      <Route path="/make-your-package" element={<div>Make Your Package Page</div>} />
      <Route path="/waxing" element={<div>Waxing Page</div>} />
      <Route path="/pedicure" element={<div>Pedicure Page</div>} />
      <Route path="/manicure" element={<div>Manicure Page</div>} />
      <Route path="/hair-care" element={<div>Hair Care Page</div>} />
      <Route path="/facial-cleanup" element={<div>Facial & Cleanup Page</div>} />
      <Route path="/bleach-detan" element={<div>Bleach & Detan Page</div>} />
      <Route path="/threading" element={<div>Threading & Face Waxing Page</div>} />
      <Route path="/Viewcart" element={<div>hiii</div>} />
      <Route path="*" element={<ViewCart />} />
    </Routes>
  );
}

export default App;