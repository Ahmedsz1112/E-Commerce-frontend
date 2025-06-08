"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../context/Cart/CartContext";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    deleteItemInCart,
    removeAllItem,
  } = useCart();

  const handleQuantity = (productId, quantity) => {
    if (quantity <= 0) return;
    updateItemInCart(productId, quantity);
  };

  const handleDelete = (productId) => {
    deleteItemInCart(productId);
  };

  const handleRemoveAllItem = () => {
    removeAllItem();
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Cart</h2>
          {cartItems.length > 0 && (
            <button
              onClick={handleRemoveAllItem}
              className="py-1.5 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500 transition cursor-pointer"
            >
              Remove All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600">Cart is empty. Start shopping now!</p>
        ) : (
          <>
            <ul role="list" className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-36 h-24 rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} x {item.unitPrice} EGP
                      </p>
                      <button
                        onClick={() => handleDelete(item.productId)}
                        className="mt-2 text-sm text-red-600 hover:underline"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-800">
                Total: {totalAmount.toFixed(2)} EGP
              </p>
              <button
                onClick={handleCheckout}
                className="py-2 px-6 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-500 transition cursor-pointer"
              >
                Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
