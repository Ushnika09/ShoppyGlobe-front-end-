import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderSummary({ onCheckout }) {
  const cartItems = useSelector((state) => state.cart.items);

  // Group items by product id and sum quantity
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.product._id;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: item.quantity };
    } else {
      acc[key].quantity += item.quantity;
    }
    return acc;
  }, {});
  const groupedArr = Object.values(groupedItems);

  const totalItems = groupedArr.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = groupedArr.reduce((sum, item) => {
    const price = item.product.price;
    const discount = item.product.discountPercentage || 0;
    return sum + (price - (price * discount) / 100) * item.quantity;
  }, 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold text-[#00BFFF] mb-6 text-center">
        Order Summary
      </h2>
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Items ({totalItems})</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Shipping</span>
        <span className="text-green-500 font-medium">Free</span>
      </div>
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Tax</span>
        <span>Calculated at checkout</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-lg">Total</span>
        <span className="font-bold text-2xl">${subtotal.toFixed(2)}</span>
      </div>
      <Link
        to="/cart/checkout"
        className="w-full flex justify-center py-3 bg-[#00BFFF] text-white rounded-lg font-semibold text-lg shadow hover:bg-[#009acd] transition"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Link>
      <p className="text-center text-gray-400 text-xs mt-4">
        Secure checkout powered by{" "}
        <span className="font-semibold text-[#00BFFF]">ShoppyGlobe</span>
      </p>
    </div>
  );
}

export default OrderSummary;
