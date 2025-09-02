import React from "react";
import star from "../assets/star.png";
import cart from "../assets/cart.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

function Card({ pdtArr, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.8rem] p-[1.5rem] py-2">
      {pdtArr.map((pdt, i) => (
        <div
          key={i}
          className="border rounded-2xl flex flex-col relative hover:scale-[1.02] duration-300 overflow-hidden hover:shadow-2xl border-gray-600/40 cursor-pointer"
          onClick={e => {
            // Prevent navigation if Add To Cart button is clicked
            //backend api updated
            if (e.target.closest("button")) return;
            navigate(`/product/${pdt._id}`);
          }}
        >
          <div className="bg-purple-100/70 overflow-hidden">
            {pdt.thumbnail ?
              <img
              className="h-[15rem] w-full hover:scale-115 duration-300 overflow-hidden"
              src={pdt.thumbnail}
              alt=""
              loading="lazy"
            /> :
            <AiOutlineLoading/>
            }
          </div>
          <span className="capitalize absolute top-[12.5rem] left-3 px-3 py-1 rounded-2xl text-[0.7rem] font-bold border-gray-700/50 border shadow bg-neutral-100">
            {pdt.category}
          </span>
          <span className="capitalize absolute top-[1rem] left-3 px-3 py-1 rounded-2xl text-[0.7rem] font-bold border-gray-700/50 shadow bg-[#EF4343] text-white hover:bg-[#00BFFF] hover:scale-105">
            -{Math.round(pdt.discountPercentage)}%
          </span>
          <div className="px-[1rem] pb-3">
            <h1 className="font-semibold pb-4 pt-2">{pdt.title}</h1>
            <h1 className="line-clamp-2">{pdt.description}</h1>
            <h1 className="flex gap-1.5 items-center py-1.5">
              <img className="h-[1rem]" src={star} alt="" />
              {pdt.rating}
            </h1>
            <h1 className="pb-1 text-green-600 text-xl font-semibold flex items-center gap-2">
              $
              {(
                pdt.price -
                (pdt.price * pdt.discountPercentage) / 100
              ).toFixed(2)}
              <span className="text-gray-500 line-through text-[1rem]">
                ${pdt.price}
              </span>
            </h1>
            <h1 className="text-[0.7rem] font-medium text-gray-600">
              {pdt.brand ? `By ${pdt.brand}` : ""}
            </h1>
          </div>
          <button
            className="flex gap-1.5 justify-center items-center bg-[#00BFFF] text-white m-auto mx-4 py-2 rounded-2xl shadow shrink-0 mb-[1rem] my-2 font-semibold hover:bg-[#00ACE6]"
            onClick={e => {
              e.stopPropagation();
              addToCart(pdt);
            }}
          >
            <img className="h-[1rem] hover:cursor-pointer" src={cart} alt="" />
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
