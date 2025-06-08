"use client";
import React, { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

export default function MyOrderPage() {
  const { getMyOrders, myorder } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">My Orders</h1>

      {myorder.length === 0 ? (
        <p className="text-center text-gray-500">You don't have any orders yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {myorder.map(({ _id, address, total, orderItems }) => (
            <div
              key={_id}
              className="border border-gray-300 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Order #{_id.slice(-6)}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Address:</span> {address}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Items:</span> {orderItems.length}
              </p>
              <p className="text-gray-700 font-semibold mt-2">
                Total: <span className="text-indigo-600">{total.toFixed(2)} EGP</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
