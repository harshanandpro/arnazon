import React, { useState, useEffect } from 'react'
import arnazon from '../assets/amazon.png'
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'
import { useCart } from '../context/CartContext';
const Navbar = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleCartClick = () => {
  navigate('/cart');
};
const { cartCount } = useCart();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

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
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <img 
            src={arnazon} 
            alt="Logo" 
            className="navbar__logo"
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <div className="navbar__center">
          <div className="search__container">
            <input 
              type="text" 
              className="navbar__input" 
              placeholder="Search products..."
            />
            <button className="search__button">
              <IoMdSearch className="search__icon"/>
            </button>
          </div>
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div className="navbar__avatar"></div>
              <button 
                onClick={handleLogout}
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
                Logout
              </button>
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
  )
}

export default Navbar
