
'use client'

import { useEffect, useState } from 'react';
import useUserIDStore from '../../Component/store/userIDSet';

export default function SuccessClient({ customerEmail }) {
  const [email, setEmail] = useState(customerEmail);
  const { userID } = useUserIDStore();  // Hook should be called here inside the component

  const finalCartOrder = async (userID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/order-final/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message || "Failed to finalize order");
      }

      const data = await response.json();
      return data; // or handle it as needed (e.g., update UI)
    } catch (error) {
      console.error("Error finalizing cart order:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      finalCartOrder(userID); // Pass the userID here
    }
  }, [userID]); // Depend on userID to ensure it updates when it changes

  return (
    <section id="success" className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase! A confirmation email will be sent to{' '}
          <strong>{email || 'your email'}</strong>.
        </p>
        <p className="text-gray-600 mb-4">If you have any questions, feel free to contact us at:</p>
        <a
          href="mailto:orders@example.com"
          className="text-blue-600 font-semibold underline hover:text-blue-800"
        >
          orders@example.com
        </a>
      </div>
    </section>
  );
}
