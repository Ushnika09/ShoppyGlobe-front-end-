import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import Slider from "../Components/Slider";
import Actions from "../Components/Actions";
import SearchContext from "../Components/SearchContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import useFetchProducts from "../hooks/useFetchProducts";
import axios from "axios";
import API_BASE_URL from "../../config";

const Card = lazy(() => import("../Components/Card"));

function Main() {
  const url =`${API_BASE_URL}/api/products`

  const { products: pdtArr, loading, error } = useFetchProducts(url);
  const [filteredPdt, setFilterdPdt] = useState([]);
  const { searchItems, setSearchItems } = useContext(SearchContext);
  const [sortOpt, setSortOpt] = useState("");
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setFilterdPdt(pdtArr);
  }, [pdtArr]);

  useEffect(() => {
    let res = [...pdtArr];
    const query = searchItems.trim().toLowerCase();

    if (query !== "") res = res.filter((p) => p.title.toLowerCase().startsWith(query));
    if (category !== "all") res = res.filter((p) => p.category === category);

    if (sortOpt === "a-z") res.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOpt === "high-low") res.sort((a, b) => b.price - a.price);
    else if (sortOpt === "low-high") res.sort((a, b) => a.price - b.price);
    else if (sortOpt === "rating") res = res.filter((p) => p.rating >= 4);

    setFilterdPdt(res);
  }, [pdtArr, searchItems, category, sortOpt]);

  const categories = [...new Set(pdtArr.map((p) => p.category))];

  // Add product to backend cart
  const handleAddToCart = async (pdt) => {
    if (!token) return alert("Login first to add to cart");
    try {
      const res = await axios.post(
        "http://localhost:5000/cart",
        { productId: pdt._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addToCart(res.data));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-[#00BFFF] text-xl font-semibold">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-xl font-semibold">
        Failed to load products.
      </div>
    );

  return (
    <div className="min-h-screen">
      <Slider />
      <Actions
        categories={categories}
        category={category}
        sortOpt={sortOpt}
        categoryChange={setCategory}
        onSort={setSortOpt}
        clearFilters={() => {
          setCategory("all");
          setSortOpt("");
          setSearchItems("");
        }}
      />
      <h1 className="px-[1.5rem] py-3 text-xl text-gray-900/60">
        Showing {filteredPdt.length} products
      </h1>
      <Suspense>
        <Card pdtArr={filteredPdt} addToCart={handleAddToCart} />
      </Suspense>
    </div>
  );
}

export default Main;
