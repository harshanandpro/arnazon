import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContex';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { PublicRoute } from './Components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            
            {/* Login Route */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Shop />} />
            </Route>

            {/* Cart Route */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Cart />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
