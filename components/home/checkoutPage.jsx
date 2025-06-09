"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/Cart/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/url";

export default function CartPage() {
  const { token } = useAuth();
  const { cartItems, totalAmount, removeAllItem } = useCart();
  const [error, setError] = useState("");
  const router = useRouter();
  const addressRef = useRef(null);

  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;

    if (!address) {
      setError("You must enter your location.");
      return;
    }

    const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    const data = await response.json();

    if (!data) {
      setError("Invalid token or session expired.");
      return;
    }

    router.push("/order");
    removeAllItem();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600 mb-4">Cart is empty. Please add items first.</p>
        ) : (
          <ul role="list" className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-20 rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.unitPrice} EGP
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {(item.quantity * item.unitPrice).toFixed(2)} EGP
                </p>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mt-8">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <input
                id="address"
                ref={addressRef}
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-800">
                Total: {totalAmount.toFixed(2)} EGP
              </p>
              <button
                onClick={handleConfirmOrder}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
              >
                PAY NOW
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
