
"use client"
import React from "react";
import OrderSummary from "../OrderSummary";
import { useEffect, useState } from "react";

export default function CheckoutForm(){

    const [products, Setproducts] = useState([]);
  
  
  
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

        const userid = localStorage.getItem("UserID");
        fetchProductCartData(userid);

    }, []); // Add userID to dependency array in case it loads later


    const Tax = 5.52;
    const Shipping = 5.00 ;

 
    const Subtotal = products.reduce((acc, item) => {return acc + item.price * item.quantity;}, 0);

    const Total = Subtotal + Shipping + Tax ;

    return(<>
          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Order summary </h2>
            <div className="space-y-4">

                {products.map((data) => {
                    return (
                        <div key={data.id} className="flex items-center justify-between py-2 ">
                            <div className="flex items-center gap-4">
                                <img
                                    src={data.imageSrc}
                                    alt={data.imageAlt}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{data.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {data.color} &middot; Qty: {data.quantity}
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm font-semibold text-gray-800">${data.price}</div>
                        </div>
                    );
                })}

            </div>
            <div className="border-t pt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>$ {Subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>$ {Shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>$ {Tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-gray-900"><span>Total</span><span>$ {Total.toFixed(2)}</span></div>
            </div>
            {/* <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700">Confirm order</button> */}
        </div>
    
    </>);
}