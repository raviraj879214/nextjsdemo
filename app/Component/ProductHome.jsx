"use client"

import { useEffect, useState } from "react";
import Link from "next/link";



const ProductHome = () => {
  const [products, setProductData] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Product home", result);

      if (response.ok) {
        console.log("products : " + result);
        if (Array.isArray(result)) {
          setProductData(result);
        } else if (Array.isArray(result?.data)) {
          setProductData(result.data);
        } else {
          console.error("Unexpected response format:", result);
          setProductData([]); // fallback
        }
      } else {
        console.log("Error fetching products:", result.message);
      }
    } catch (error) {
      console.log("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {/* Fallback UI if no products */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <Link key={product._id} href={"/product-details"} className="group">
                <img
                 
                  src={`${process.env.NEXT_PUBLIC_APP_URL}${product.imageUrl}`}

                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHome;
