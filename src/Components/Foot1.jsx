import React from "react";
import logo from "../assets/logo.png";

function Foot1() {
  return (
    <div className="max-w-full flex flex-col justify-end items-start text-[#D1D5DB] flex-1">
      <div className="flex gap-2.5 justify-center items-center py-[1rem]">
        <div className=" shrink-0">
          <img
            src={logo}
            alt=""
            className="md:h-[3rem] md:p-[0.5rem] h-[2rem] p-[0.3rem] bg-[#00BFFF] rounded-lg md:rounded-2xl "
          />
        </div>
        <p className="text-[1.1rem] md:text-2xl font-bold text-[#00BFFF]">
          ShoppyGlobe
        </p>
      </div>
      <p>
        Your one-stop destination for quality products at amazing prices. Shop
        with confidence and discover your world of shopping.
      </p>
    </div>
  );
}

export default Foot1;
