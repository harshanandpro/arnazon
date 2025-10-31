import React, { useState, useEffect } from 'react'
import './ShopBody.css'
import ShopRow from './ShopRow'

const ShopBody = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  if (loading) {
    return (
      <div className="loading__container">
        <div className="loading__spinner"></div>
        <p>Loading Collection...</p>
      </div>
    );
  }

  return (
    <div className="shop__body">
      {categories.map((category, index) => (
        <ShopRow 
          key={index}
          title={category}
          products={getProductsByCategory(category)}
        />
      ))}
    </div>
  )
}

export default ShopBody
