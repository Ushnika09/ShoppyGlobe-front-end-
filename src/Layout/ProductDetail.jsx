import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import cart from "../assets/cart.png";
import star from "../assets/star.png";
import axios from "axios";
import API_BASE_URL from "../../config";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // user token
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !token) return;
    setAdding(true);

    try {
      // 1️⃣ Update backend cart
      const res = await axios.post(
        "http://localhost:5000/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Update frontend cart
      dispatch(addToCart(res.data)); // res.data should return the cart item added
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  if (!product || product.message === "Product not found") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-[#00BFFF] mb-4">Product Not Found</h2>
        <button
          className="px-6 py-2 bg-[#00BFFF] text-white rounded-lg font-semibold shadow hover:bg-[#009acd] transition"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 my-10">
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden max-w-xs rounded-xl">
        <div className="bg-gradient-to-br from-[#e6f6ff] to-[#b3e0ff] p-4 rounded-xl shadow mb-4 w-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-xs h-80 object-contain rounded-xl shadow-lg bg-white hover:scale-105 duration-300"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#00BFFF]">{product.title}</h1>
          <p className="text-gray-600 mb-2 text-lg">{product.brand}</p>
          <div className="flex items-center gap-2 mb-4">
            <img src={star} alt="rating" className="h-5" />
            <span className="text-lg font-semibold">{product.rating}</span>
            <span className="text-gray-400">| {product.category}</span>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
            </span>
            <span className="line-through text-gray-400 text-lg">${product.price}</span>
            <span className="bg-[#EF4343] text-white px-2 py-1 rounded-lg text-sm font-semibold">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
          <div className="mb-4">
            <span className="text-gray-500">Stock: </span>
            <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? product.stock : "Out of Stock"}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-gray-500">Brand: </span>
            <span className="font-semibold">{product.brand}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className={`flex gap-2 items-center px-6 py-2 bg-[#00BFFF] text-white rounded-lg font-semibold shadow hover:bg-[#009acd] transition ${
              adding ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            <img src={cart} alt="cart" className="h-5" />
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <button
            className="px-6 py-2 bg-gray-100 text-[#00BFFF] rounded-lg font-semibold shadow hover:bg-[#e0f7ff] transition"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
