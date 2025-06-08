"use client";
import { createContext, useContext } from "react";

export const CartContext = createContext({
  cartItems: [],
  totalAmount: 0,
  addItemsToCart: () => {},
  updateItemInCart: () => {},
  deleteItemInCart: () => {},
  removeAllItem: () => {}
});

export const useCart = () => useContext(CartContext);
