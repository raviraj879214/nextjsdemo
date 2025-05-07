// app/error/page.jsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter()
  


  useEffect(() => {
    // Optionally, redirect back to home after some delay
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-4">
          We couldn't process your payment request. Please try again or contact support if the issue
          persists.
        </p>
        <a href="/" className="text-blue-600 font-semibold underline hover:text-blue-800">
          Go back to home
        </a>
      </div>
    </section>
  )
}
