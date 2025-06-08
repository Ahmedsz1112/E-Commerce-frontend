import Link from "next/link";
import React from "react";

export default function OrderPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center bg-white shadow-md rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600">Thank You for Your Order!</h1>
        <p className="mt-4 text-gray-700">
          We're now processing your order and will get back to you shortly.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
