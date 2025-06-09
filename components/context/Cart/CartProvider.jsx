"use client";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { BASE_URL } from "@/components/constants/url";
import { useAuth } from "../Auth/AuthContext";

const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const mapCartItems = (items) =>
    items.map(({ product, quantity }) => ({
      productId: product._id,
      title: product.title,
      image: product.image,
      quantity,
      unitPrice: product.price,
    }));

  const handleResponse = async (response, errorMsg) => {
    if (!response.ok) {
      setError(errorMsg);
      return null;
    }
    try {
      return await response.json();
    } catch {
      setError("Failed to parse server response.");
      return null;
    }
  };

  const fetchCart = async () => {
    if (!token) return;
    try {
      const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cart = await handleResponse(response, "Failed to fetch cart");
      if (!cart) return;

      setCartItems(mapCartItems(cart.items));
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching the cart.");
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const addItemsToCart = async (productId) => {
    try {
      const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const cart = await handleResponse(response, "Failed to add item to cart");
      if (!cart) return;

      setCartItems(mapCartItems(cart.items));
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItemInCart = async (productId, quantity) => {
    try {
      const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const cart = await handleResponse(
        response,
        "Failed to update item in cart"
      );
      if (!cart) return;

      setCartItems(mapCartItems(cart.items));
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItemInCart = async (productId) => {
    try {
      const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cart = await handleResponse(
        response,
        "Failed to delete item from cart"
      );
      if (!cart) return;

      setCartItems(mapCartItems(cart.items));
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const removeAllItems = async () => {
    try {
      const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cart = await handleResponse(response, "Failed to empty the cart");
      if (!cart) return;

      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemsToCart,
        updateItemInCart,
        deleteItemInCart,
        removeAllItems,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
