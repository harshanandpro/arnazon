import React from 'react'
import arnazon from '../assets/amazon.png'
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <img src={arnazon} alt="Amazon Logo" className="navbar__logo" />
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
          <div className="cart__container">
            <MdOutlineShoppingCart className="cart__icon"/>
            <span className="cart__badge">3</span>
          </div>
          <div className="navbar__avatar"></div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
