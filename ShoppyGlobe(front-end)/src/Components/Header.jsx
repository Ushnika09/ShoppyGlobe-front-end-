import React, { useEffect, useContext, useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import cart from "../assets/cart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchContext from "./SearchContext";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from "../redux/authSlice";
import { PiSignOutBold } from "react-icons/pi";

function Header() {
  const [online, setOnline] = useState(navigator.onLine);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { searchItems, setSearchItems } = useContext(SearchContext);

  // 👇 new: auth state
  const { user } = useSelector((state) => state.auth);
//   useEffect(() => {
//   console.log("Auth user:", user?.name);
// }, [user]);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem("token");
  navigate("/logout"); // go to logout page first
};


  return (
    <div className="py-4 px-5 bg-white/90 shadow-md fixed top-0 w-full z-10 flex justify-center items-center flex-wrap">
      {/* Main Row: Logo, Search, Home+Cart */}
      <div className="flex items-center justify-between w-full gap-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <img
              src={logo}
              alt=""
              className="md:h-[3rem] md:p-1 h-8 p-1 bg-[#00BFFF] rounded-lg md:rounded-2xl shrink-0"
            />
            <div
              className={`absolute md:h-4 md:w-4 w-2 h-2 rounded-full md:left-9 -top-1 -right-1 animate-pulse ${
                online ? "bg-[#FFB400]" : "bg-red-500"
              }`}
            ></div>
          </div>
          <p className="text-[1.1rem] md:text-2xl font-bold text-[#00BFFF]">
            ShoppyGlobe
          </p>
        </Link>

        {/* Search: center */}
        <div className="flex-1 mx-5 relative hidden md:flex justify-center lg:max-w-sm">
          <input
            onChange={(e) => setSearchItems(e.target.value)}
            value={searchItems}
            type="text"
            placeholder="Search products..."
            className=" w-full border-2 border-gray-300 rounded-xl pl-8 py-1 md:py-2 text-sm md:text-base bg-neutral-100 focus:outline-none "
          />
          <img
            src={search}
            alt=""
            className="absolute left-2 top-1/2 -translate-y-1/2 h-4 md:h-5"
          />
        </div>

        {/* Home + Cart + Auth */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
          <Link
            to="/"
            className={`text-[1rem] md:text-xl hover:cursor-pointer hover:text-[#00BFFF] px-3 py-1 hover:bg-neutral-100 duration-300 rounded-sm ${
              location.pathname === "/" ? "bg-[#00BFFF] text-white" : "bg-white"
            }`}
          >
            Home
          </Link>

          <Link
            to="cart"
            className={`hover:cursor-pointer hover:text-[#00BFFF] hover:bg-neutral-100 rounded-sm duration-300 relative shrink-0 ${
              location.pathname === "/cart"
                ? "bg-[#00BFFF] text-white"
                : "bg-white/0"
            }`}
          >
            <img src={cart} alt="" className="h-8 md:h-10 p-1 px-3" />
            <div className="md:h-7 md:w-7 h-5 w-5 rounded-full flex justify-center items-center bg-red-800 text-white text-[0.7rem] md:text-xl font-semibold absolute md:bottom-5 md:left-8 bottom-4.5 left-7">
              {totalItems}
            </div>
          </Link>

          {/* 👇 Auth Links */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <Link to={"/logout"}
                onClick={handleLogout}
                className={`hover:cursor-pointer hover:text-[#00BFFF] hover:bg-neutral-100 rounded-sm duration-300 relative shrink-0 ${
                location.pathname === "/signin"
                  ? "bg-[#00BFFF] text-white"
                  : "bg-white/0"
              }`}
              
              >
                <PiSignOutBold className="text-2xl md:text-3xl" />
              </Link>
            </div>
          ) : (
            <Link
              to="/signin"
              className={`hover:cursor-pointer hover:text-[#00BFFF] hover:bg-neutral-100 rounded-sm duration-300 relative shrink-0 ${
                location.pathname === "/signin"
                  ? "text-[#00BFFF] t"
                  : "bg-white/0"
              }`}
            >
              <FaRegUserCircle className="text-2xl md:text-3xl" />
            </Link>
          )}
        </div>
      </div>

      {/* Search on small screens */}
      <div className="max-w-sm mt-2 flex justify-center md:hidden relative ">
        <input
          onChange={(e) => setSearchItems(e.target.value)}
          value={searchItems}
          type="text"
          placeholder="Search products..."
          className="min-w-sm border-2 border-gray-300 rounded-xl pl-8 py-1 text-sm bg-neutral-100 focus:outline-none"
        />
        <img
          src={search}
          alt=""
          className="absolute left-2 top-1/2 -translate-y-1/2 h-4"
        />
      </div>
    </div>
  );
}

export default Header;
