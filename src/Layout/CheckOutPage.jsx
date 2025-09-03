// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../config";

const paymentOptions = [
  "Credit/Debit Card",
  "UPI",
  "Net Banking",
  "Cash on Delivery",
];

export default function CheckoutPage() {
  const [selected, setSelected] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // get token from redux

  const handlePlaceOrder = async () => {
    try {
      // Clear backend cart
      if (token) {
        await axios.delete(`${API_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Clear frontend cart
      dispatch(clearCart());
      setOrderPlaced(true);

      setTimeout(() => {
        navigate("/"); // redirect to home
      }, 1800);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
        {!orderPlaced ? (
          <>
            <h2 className="text-2xl font-bold text-[#00BFFF] mb-6 text-center">
              Choose Payment Method
            </h2>
            <div className="space-y-4 mb-6">
              {paymentOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    selected === option
                      ? "border-[#00BFFF] bg-[#e6f6ff]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                    className="accent-[#00BFFF] w-5 h-5"
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
            <button
              className="w-full py-3 bg-[#00BFFF] text-white rounded-lg font-semibold text-lg shadow hover:bg-[#009acd] transition disabled:opacity-60"
              disabled={!selected}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <svg
              className="w-16 h-16 mb-4 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="#e6fbe6"
              />
              <path
                d="M8 12l2 2 4-4"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Order Placed!
            </h3>
            <p className="text-gray-600 text-center">
              Thank you for shopping with ShoppyGlobe.
              <br />
              Redirecting to home...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
