"use client";
import Link from "next/link";
import { ShoppingCartIcon } from '@heroicons/react/outline'; // Import Cart Icon
import Cardslider from "./Cardslider";
import { useState } from "react";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(3); // Cart count (can be dynamic)
  const [cartslide, setCartSlide] = useState(false); // State to show/hide the cart slider

  // Cart click function
  const Cartfunction = () => {
    setCartSlide(true); // Show the cart slide
  };

  // Close cart function
  const closeCart = () => {
    setCartSlide(false); // Hide the cart slide
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-blue-600">
                Your logo
              </a>
            </div>

            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              
              <Link href={"/contactus"} className="text-gray-700 hover:text-blue-600" >Contact</Link>
              <Link href={"/login"} className="text-gray-700 hover:text-blue-600" >Login</Link>
              <a onClick={Cartfunction} className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Cart ({cartItemCount})
              </a>
            </nav>

            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
                {/* Hamburger Icon */}
                <svg
                  className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conditionally render the Cardslider and pass props */}
      <Cardslider isOpen={cartslide} closeCart={closeCart} />
    </>
  );
};

export default Header;
