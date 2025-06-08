"use client";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";
import { useCart } from "../context/Cart/CartContext";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const { addItemsToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        let data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchProducts();
    
  }, []);

  if (error) {
    return <p>Message error and Not Found Data</p>;
  }

  return (
   <div className="bg-gray-50 py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(({ _id, title, image, price }) => (
        <div
          key={_id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-3"
        >
          <img
            src={image}
            alt={title}
            className="w-fit h-64 rounded-t-2xl"
          />
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-indigo-600 text-xl font-bold mt-2">${price}</p>
            <button
              onClick={() => addItemsToCart(_id)}
              className="mt-4 inline-block w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
