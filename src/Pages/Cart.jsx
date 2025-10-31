import React from 'react'
import './Cart.css'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { useCurrency } from '../context/CurrencyContex'
import { FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const { formatPrice, getCurrencySymbol, convertPrice } = useCurrency();

  if (cartItems.length === 0) {
    return (
      <div className="empty__cart">
        <div className="empty__cart__content">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started</p>
          <button 
            className="continue__shopping__btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart__page">
      <div className="cart__container">
        <h1 className="cart__title">Shopping Cart</h1>
        
        <div className="cart__content">
          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart__item">
                <div className="item__image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item__details">
                  <h3 className="item__name">{item.title}</h3>
                  <p className="item__category">{item.category}</p>
                  <div className="item__rating">
                    ★ {item.rating.rate} ({item.rating.count} reviews)
                  </div>
                </div>

                <div className="item__quantity">
                  <button 
                    className="qty__btn"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  >
                    <FiMinus />
                  </button>
                  <span className="qty__value">{item.quantity || 1}</span>
                  <button 
                    className="qty__btn"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="item__price">
                  <p className="item__unit__price">
                    {getCurrencySymbol()}{formatPrice(item.price)}
                  </p>
                  <p className="item__total__price">
                    {getCurrencySymbol()}{formatPrice(item.price * (item.quantity || 1))}
                  </p>
                </div>

                <button 
                  className="item__remove__btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          <div className="cart__summary">
            <h2>Order Summary</h2>
            
            <div className="summary__row">
              <span>Subtotal</span>
              <span>{getCurrencySymbol()}{formatPrice(totalPrice)}</span>
            </div>

            <div className="summary__row">
              <span>Shipping</span>
              <span className="shipping__free">FREE</span>
            </div>

            <div className="summary__row">
              <span>Tax (10%)</span>
              <span>{getCurrencySymbol()}{formatPrice(totalPrice * 0.1)}</span>
            </div>

            <div className="summary__divider"></div>

            <div className="summary__row total">
              <span>Total</span>
              <span>{getCurrencySymbol()}{formatPrice(totalPrice + totalPrice * 0.1)}</span>
            </div>

            <button className="checkout__btn">Proceed to Checkout</button>
            
            <button 
              className="continue__shopping"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>

            <button 
              className="clear__cart__btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
