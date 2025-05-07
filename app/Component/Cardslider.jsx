"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from './Context/CartContext'; // Import your custom hook
import { useEffect, useState } from 'react';

import Link from 'next/link';




export default function CartSlider() {
  const { cartSlide, closeCart } = useCart();

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("UserID");
    setUserID(storedUserID);
  }, []);

     const calculateSubtotal = () => 
      products.reduce((total, item) => 
        total + (typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price) * item.quantity, 0
      );
    

     const [products,Setproducts] = useState([]);

      

      
      const fetchProductCartData = async (userID) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-carts/${userID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
      
          const result = await response.json();
          console.log("Cart details:", result);
          
          if (!Array.isArray(result) || result.length === 0) {
            // Handle empty cart case
            console.log("No items in cart.");
            Setproducts([]); // Set empty state
            return;
          }
          
          const formattedProducts = result.map(item => ({
            id: item._id, // or item.cartId
            name: item.productId?.name || 'Unknown Product',
            href: `/product-details/${item.productId?.ProductUrl || 'unknown'}`,
            color: item.productId?.color || 'N/A',
            price: item.productId?.price || 0,
            quantity: item.quantity,
            imageSrc: `${process.env.NEXT_PUBLIC_APP_URL}${item.productId?.imageUrl || '/placeholder.png'}`,
            imageAlt: item.productId?.name || '',
          }));
          
          Setproducts(formattedProducts);
          
         

          // Optionally, update state here if needed
          // setCartItems(result);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      
      useEffect(() => {
       
        if (userID) {
          fetchProductCartData(userID);
        }
        
      }, [cartSlide]); // Add userID to dependency array in case it loads later



      const deleteCartItem = async (id) => {
        debugger;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete-cart-item/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            console.log('Failed to delete cart item');
          }

          Setproducts([]);
          fetchProductCartData(userID);
          const result = await response.json();
          console.log('Item deleted successfully:', result);
        } catch (error) {
          console.error('Error deleting cart item:', error);
        }
      };
      

      



  return (
    <Dialog open={cartSlide} onClose={closeCart} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"/>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeCart}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={product.imageSrc} alt={product.imageAlt} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty {product.quantity}</p>
                                <button onClick={()=>{deleteCartItem(product.id)}}  className="font-medium text-indigo-600 hover:text-indigo-500"> Remove</button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">


                  <Link
                      href={products.length > 0 ? "/check-out" : "#"} // Prevent navigation if no products
                      className={`flex items-center justify-center rounded-md border border-transparent 
                        bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs 
                        hover:bg-indigo-700 ${products.length === 0 ? "cursor-not-allowed opacity-50" : ""}`}>
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping <span aria-hidden="true">→</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
