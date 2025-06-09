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

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. please try again");
      }

      const cart = await response.json();

      

      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token]);

  const addItemsToCart = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to add to cart");
      }

      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItemInCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("Failed to update to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to update to cart");
      }

      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItemInCart = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        setError("Failed to delete to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to delete to cart");
      }

      const cartItemsMapped = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const removeAllItem = async() => {
     try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        setError("Failed to empty to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to delete to cart");
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, totalAmount, addItemsToCart, updateItemInCart , deleteItemInCart , removeAllItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
