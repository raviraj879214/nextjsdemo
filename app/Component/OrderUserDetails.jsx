"use client";
import { useEffect, useState } from "react";
import useUserIDStore from "./store/userIDSet";

function OrderUserDetails() {
  const [products, setProducts] = useState([]);
  const { userID } = useUserIDStore();

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-order/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setProducts(result.orderDetails || []);
        console.log("order details user", result.orderDetails);
      } else {
        console.log("Failed to fetch order details");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchOrderDetails();
    }
  }, [userID]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_APP_URL}${item.productId.imageUrl}`}

                      alt={item.productId.name || "Product"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.productId.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">${item.productId.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No order details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderUserDetails;
