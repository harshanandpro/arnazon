import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const EXCHANGE_RATE = 88.76; // 1 USD = 88.76 INR

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save to localStorage when currency changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Converts price without adding .toFixed - returns number
  const convertPrice = (priceInUSD) => {
    if (typeof priceInUSD !== 'number') {
      priceInUSD = parseFloat(priceInUSD);
    }

    if (currency === 'INR') {
      return priceInUSD * EXCHANGE_RATE;
    }
    return priceInUSD;
  };

  // Formats price for display - returns string with currency symbol
  const formatPrice = (priceInUSD) => {
    const converted = convertPrice(priceInUSD);
    return converted.toFixed(2);
  };

  const getCurrencySymbol = () => {
    return currency === 'USD' ? '$' : '₹';
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const value = {
    currency,
    changeCurrency,
    convertPrice,    // Returns number
    formatPrice,     // Returns formatted string
    getCurrencySymbol,
    EXCHANGE_RATE
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
