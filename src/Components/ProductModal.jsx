import React, { useEffect } from 'react'
import './ProductModal.css'
import { MdClose } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContex'

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
    const { convertPrice, getCurrencySymbol } = useCurrency();
  

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!product) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <MdClose />
        </button>

        <div className="modal__content">
          {/* Left Side - Image */}
          <div className="modal__left">
            <div className="modal__image__wrapper">
              <img 
                src={product.image} 
                alt={product.title}
                className="modal__image"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="modal__right">
            <span className="modal__category">{product.category}</span>
            
            <h2 className="modal__title">{product.title}</h2>

            <div className="modal__rating">
              <div className="rating__stars">
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
              </div>
              <span className="rating__text">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="modal__price">
              <span className="price__current">{getCurrencySymbol()}{convertPrice(product.price)}</span>
              <span className="price__original">{getCurrencySymbol()}{convertPrice((product.price * 3).toFixed(2))}</span>
              <span className="price__discount">-67%</span>
            </div>

            <div className="modal__description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="modal__divider"></div>

            <div className="modal__quantity">
              <label>Quantity:</label>
              <div className="quantity__controls">
                <button 
                  className="qty__btn"
                  onClick={decreaseQty}
                >
                  <FiMinus />
                </button>
                <span className="qty__value">{quantity}</span>
                <button 
                  className="qty__btn"
                  onClick={increaseQty}
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="modal__actions">
              <button 
                className="btn__add__cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className="btn__wishlist"
                onClick={onClose}
              >
                Add to Wishlist
              </button>
            </div>

            <div className="modal__features">
              <div className="feature__item">
                <span className="feature__icon">🚚</span>
                <span>Free Shipping on orders over $50</span>
              </div>
              <div className="feature__item">
                <span className="feature__icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="feature__item">
                <span className="feature__icon">🔒</span>
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
