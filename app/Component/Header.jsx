"use client";
import Link from "next/link";
import { ShoppingCartIcon } from '@heroicons/react/outline'; // Import Cart Icon
import CartSlider from "./Cardslider";
import { useEffect, useState } from "react";
import Rolename from "./Hooks/Rolename";
import { useSignout } from "./Hooks/useSignout";
import { useCart } from "./Context/CartContext";

const Header = () => {
  const [cartslide, setCartSlide] = useState(false); // State to show/hide the cart slider
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const { Cartfunction, cartItemCount } = useCart();

  const signout = useSignout();

  const [signin,SetSignin] = useState(false);


  useEffect(()=>{
    if(typeof window !== undefined){
      const  token = localStorage.getItem("token");
      if(token != ""){
        SetSignin(true);
      }
      else{
        SetSignin(false);
      }
    }

  },[]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-blue-600">
                MyLogo
              </a>
            </div>

            <nav className="hidden md:flex space-x-6 relative"> {/* Add relative positioning */}
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <Link href={"/contactus"} className="text-gray-700 hover:text-blue-600">Contact</Link>

              {signin  ? (
                <div className="relative">
                  {/* User Profile Image */}
                  <button onClick={toggleDropdown} className="flex items-center space-x-2">
                    {/* Replace with the user's profile image */}
                    <img 
                      src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"  // Replace this path with the actual image path
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-gray-300" // Rounded circle
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-2">
                        <li>
                          <Link href="/user-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        </li>
                        <li>
                          <Link href="/order-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                        </li>
                        <li>
                          <a onClick={signout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link href={"/login"} className="text-gray-700 hover:text-blue-600">Login</Link>
              )}

              <a onClick={Cartfunction} className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Cart 
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

      <CartSlider />
    </>
  );
};

export default Header;