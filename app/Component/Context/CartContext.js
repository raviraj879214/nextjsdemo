"use client"
import React, { createContext, useContext, useState } from 'react';



// Create Context
const CartContext = createContext();



// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};



// Cart Context Provider
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(""); // Default cart item count
  const [cartSlide, setCartSlide] = useState(false); // Whether the cart is open or closed

  // Function to open the cart
  const Cartfunction = () => {
    setCartSlide(true);
  };

  // Function to close the cart
  const closeCart = () => {
    setCartSlide(false);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, cartSlide, Cartfunction, closeCart }}>
      {children}
    </CartContext.Provider>
  );
};
