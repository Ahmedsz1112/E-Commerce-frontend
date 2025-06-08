import CartPage from "@/components/home/cartpage";
import ProdectedRoute from "@/components/home/prodectedRoute";
import React from "react";

function Cart() {
  return (
    <ProdectedRoute>
      <CartPage />
    </ProdectedRoute>
  );
}

export default Cart;
