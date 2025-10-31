import React, { useState, useEffect, useRef } from 'react'
import arnazon from '../assets/amazon.png'
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContex';
import ProductModal from '../Components/ProductModal';
import './Navbar.css'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  
  const navigate = useNavigate();
  const { currentUser, logout, userPhotoURL } = useAuth();
  const { cartCount } = useCart();
  const { currency, changeCurrency, getCurrencySymbol } = useCurrency();

  // Fetch all products on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle scroll event
useEffect(() => {
  const handleScroll = () => {
    // Check if scrolled down more than 50px
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setSearchResults(filtered);
    setShowDropdown(filtered.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/?search=${searchQuery}`);
      setShowDropdown(false);
    }
  };

  const handleProductClick = (product) => {
    setSearchQuery('');
    setShowDropdown(false);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCurrencyChange = (newCurrency) => {
    changeCurrency(newCurrency);
  };

  return (
    <>
<nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <div className="navbar__left">
            <img 
              src={arnazon} 
              alt="Logo" 
              className="navbar__logo"
              onClick={() => navigate('/home')}
            />
          </div>
          
          <div className="navbar__center" ref={searchRef}>
            <form className="search__container" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                className="navbar__input" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery && setShowDropdown(true)}
              />
              <button type="submit" className="search__button">
                <IoMdSearch className="search__icon"/>
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showDropdown && (
              <div className="search__dropdown">
                {searchResults.map((product) => (
                  <div 
                    key={product.id}
                    className="search__result__item"
                    onClick={() => handleProductClick(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="result__image"
                    />
                    <div className="result__details">
                      <h4 className="result__title">{product.title}</h4>
                      <p className="result__category">{product.category}</p>
                      <p className="result__price">{getCurrencySymbol()}{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="navbar__right">
            <div className="theme__toggle" onClick={toggleTheme}>
              {isDarkMode ? (
                <MdLightMode className="theme__icon" />
              ) : (
                <MdDarkMode className="theme__icon" />
              )}
            </div>
            
            <div className="cart__container" onClick={handleCartClick}>
              <MdOutlineShoppingCart className="cart__icon"/>
              <span className="cart__badge">{cartCount || 0}</span>
            </div>
            
            {currentUser ? (
              <div className="profile__menu" ref={profileRef}>
                <button 
                  className="avatar__btn"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {userPhotoURL ? (
                    <img 
                      src={userPhotoURL} 
                      alt="Profile" 
                      className="avatar__image"
                    />
                  ) : (
                    <div className="navbar__avatar"></div>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="profile__dropdown">
                    <div className="profile__header">
                      <div className="profile__info">
                        {userPhotoURL && (
                          <img 
                            src={userPhotoURL} 
                            alt="Profile" 
                            className="profile__dropdown__image"
                          />
                        )}
                        <div className="profile__text">
                          <p className="profile__email">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="profile__divider"></div>

                    {/* Currency Options */}
                    <div className="currency__section">
                      <label>Currency:</label>
                      <div className="currency__options">
                        <button
                          className={`currency__btn ${currency === 'USD' ? 'active' : ''}`}
                          onClick={() => handleCurrencyChange('USD')}
                        >
                          USD ($)
                        </button>
                        <button
                          className={`currency__btn ${currency === 'INR' ? 'active' : ''}`}
                          onClick={() => handleCurrencyChange('INR')}
                        >
                          INR (₹)
                        </button>
                      </div>
                    </div>

                    <div className="profile__divider"></div>

                    {/* Logout Button */}
                    <button 
                      className="logout__btn"
                      onClick={handleLogout}
                    >
                      <MdLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                style={{
                  background: 'var(--search-btn-start, #ff9900)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--search-btn-hover-start, #ff7700)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--search-btn-start, #ff9900)'}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default Navbar
