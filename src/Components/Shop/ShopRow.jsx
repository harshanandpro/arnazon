import React, { useState } from 'react'
import './ShopRow.css'
import { useCart } from '../../context/CartContext'
import ProductModal from '../ProductModal'
import { useCurrency } from '../../context/CurrencyContex'

const ShopRow = ({ title, products }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { convertPrice, getCurrencySymbol } = useCurrency();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category: product.category,
      description: product.description
    });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="shop__row">
        <div className="row__header">
          <h2 className="row__title">{title}</h2>
          <button className="view__all">View All →</button>
        </div>
        
        <div className="products__grid">
          {products.map((product) => (
            <div key={product.id} className="product__card">
              <div className="product__image__container">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product__image"
                />
                <div className="product__overlay">
                  <button 
                    className="quick__view"
                    onClick={() => handleQuickView(product)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="product__content">
                <h3 className="product__name">{product.title}</h3>
                <div className="product__meta">
                  <span className="product__price">{getCurrencySymbol()}{convertPrice(product.price)}</span>
                  <div className="product__rating">
                    <span className="rating__stars">★ {product.rating.rate}</span>
                    <span className="rating__count">({product.rating.count})</span>
                  </div>
                </div>
                <button 
                  className="add__cart__btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default ShopRow
