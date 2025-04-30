import React from "react";

export default function Checkout() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Form */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
            <input type="email" placeholder="Email address" className="mt-2 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
              <input type="text" placeholder="Last name" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            </div>
            <input type="text" placeholder="Company" className="mt-4 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Address" className="mt-4 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Apartment, suite, etc." className="mt-4 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="City" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
              <select className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500">
                <option>United States</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="State / Province" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
              <input type="text" placeholder="Postal code" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            </div>
            <input type="text" placeholder="Phone" className="mt-4 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border border-indigo-600 bg-indigo-50 p-4 rounded-lg shadow-md ring-2 ring-indigo-600 cursor-pointer">
                <div className="font-semibold text-indigo-700">Standard</div>
                <div className="text-sm text-indigo-600">4–10 business days</div>
                <div className="mt-2 font-medium">$5.00</div>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer hover:ring-2 hover:ring-indigo-500">
                <div className="font-semibold text-gray-700">Express</div>
                <div className="text-sm text-gray-500">2–5 business days</div>
                <div className="mt-2 font-medium">$16.00</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">Payment</h2>
            <div className="flex space-x-4 mb-4">
              <label><input type="radio" name="payment" className="mr-1" />Credit card</label>
              <label><input type="radio" name="payment" className="mr-1" />PayPal</label>
              <label><input type="radio" name="payment" className="mr-1" />eTransfer</label>
            </div>
            <input type="text" placeholder="Card number" className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Name on card" className="mt-4 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="Expiration date (MM/YY)" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
              <input type="text" placeholder="CVC" className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Black Tee" className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Basic Tee</div>
                  <div className="text-sm text-gray-500">Black, Large</div>
                </div>
              </div>
              <div>$32.00</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Sienna Tee" className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Basic Tee</div>
                  <div className="text-sm text-gray-500">Sienna, Large</div>
                </div>
              </div>
              <div>$32.00</div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>$64.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>$5.52</span></div>
            <div className="flex justify-between font-semibold text-gray-900"><span>Total</span><span>$75.52</span></div>
          </div>

          <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700">Confirm order</button>
        </div>
      </div>
    </div>
  );
}