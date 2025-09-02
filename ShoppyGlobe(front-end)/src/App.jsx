import "./App.css";
import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import SearchContext from "./Components/SearchContext";
import CartContext from "./Components/CartContext";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchItems, setSearchItems] = useState("");
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <SearchContext.Provider value={{ searchItems, setSearchItems }}>
        <div className="min-h-screen">
          <Header />
          <div className="md:mt-[5rem]  mt-[6.4rem]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </SearchContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
