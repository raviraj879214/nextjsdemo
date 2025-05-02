"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import userToken from "./store/userToken";





export default function Login() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {tokens,setTokens}= userToken();


  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Login Response:", result.token);

       localStorage.setItem("token",result.token);
       setTokens(result.token);
  
      if (response.ok) {
       return window.location.href="/user-dashboard";
      } else {
        // Handle error
        console.error("Login failed:", result.message);

    
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  







  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login to your account</h2>
       
        <form className="space-y-5"  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>

            <input
              type="email" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Please enter email address",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex
                  message: "Please enter a valid email address",
                },
                maxLength: {
                  value: 50,
                  message: "Email cannot exceed 50 characters",
                },
              })}  placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password" className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}   placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );

}
