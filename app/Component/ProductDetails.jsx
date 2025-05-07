'use client'

import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import useUserIDStore from "../Component/store/userIDSet";
import { useCart } from './Context/CartContext';


const productss = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  images: "",
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  ProductUrl : "test-test"
}
const reviews = { href: '#', average: 4, totalCount: 117 }








function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails({producturl}) {

   const [product,SetProduct]  = useState("");
   const { userID, setUserID } = useUserIDStore();
   const { cartItemCount, Cartfunction } = useCart();
    





   const fetchProductUrl = async (producturl) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-product-url/${producturl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json(); 
      console.log(result);

      SetProduct({
        name :  result.name,
        price : result.price,
        description : result.description,
        ProductUrl : result.ProductUrl,
        _id : result._id,
        images: [
          {
            src: `${process.env.NEXT_PUBLIC_APP_URL}${result.imageUrl}`
          }
        ]
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };


  
  useEffect(() => {
    if (producturl) {
      fetchProductUrl(producturl);
    }
  }, []); 
  


  const addToBag = async (_id) =>{
   

   
      const payload= {
        cartId : Math.floor(Math.random() * 100000),
        productId : _id,
        quantity : 1,
        userId : userID
      }

    const response  = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/add-cart`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(payload)
    });

    if(response.ok){
        const result = response.json();
    }
    else{
    }
  }

  









  return (<>
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

            <li>
                <div className="flex items-center">
                  <a href={"/"} className="mr-2 text-sm font-medium text-gray-900">
                    Home 
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

            <li className="text-sm">
              <a href={product.ProductUrl} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="col-span-3">
              {product.images && product.images.length > 0 && (
                   <img src={product.images[0].src} className="w-full h-full object-cover sm:rounded-lg"/>
               )}
            </div>
          </div>
        </div>




        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

           
              <button onClick={() => {
                addToBag(product._id);
                Cartfunction();
              }}


                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                Add to bag
              </button>
            
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   

    </>
  )
}
