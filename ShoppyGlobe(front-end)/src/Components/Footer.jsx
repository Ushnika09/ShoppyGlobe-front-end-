import React from "react";
import mail from "../assets/mail.png";
import insta from "../assets/insta.png";
import ph from "../assets/ph.png";
import x from "../assets/x.png";
import link from "../assets/link.png";

import Foot1 from "./Foot1";

function Footer() {
  return (
    <div className="bg-[#212529] w-full bottom-0  flex flex-col text-[#D1D5DB] shadow-2xl">
      <div className="  px-[2rem] py-[1rem] md:flex-row flex flex-col   justify-end md:justify-between md:items-center md:gap-[6.5rem]">
        <Foot1 />

        <div className="md:p-[0.5rem] p-[0.3rem]">
          <h1 className="text-white text-[1.1rem] md:text-2xl font-semibold py-[1rem]">
            Quick Links
          </h1>
          <h1 className="py-0.5 hover:text-[#00bFFF] hover:cursor-pointer">
            Home
          </h1>
          <h1 className="py-0.5 hover:text-[#00bFFF] hover:cursor-pointer">
            All Products
          </h1>
          <h1 className="py-0.5 hover:text-[#00bFFF] hover:cursor-pointer">
            Cart
          </h1>
          <h1 className="py-0.5 hover:text-[#00bFFF] hover:cursor-pointer">
            Contact
          </h1>
        </div>

        <div className="md:p-[0.5rem] p-[0.3rem]">
          <h1 className="text-white text-[1.1rem] md:text-2xl font-semibold py-[1rem]">
            Contact Us
          </h1>
          <h1 className="py-1.5 hover:text-[#00bFFF] hover:cursor-pointer flex gap-2.5 items-center">
            <img className="h-[1rem]" src={mail} alt="" />
            support@shoppyglobe.com
          </h1>

          <h1 className="pt-1.5 hover:text-[#00bFFF] hover:cursor-pointer flex gap-2.5 items-center">
            <img className="h-[1rem]" src={ph} alt="" />
            +1 (234) 567-8900
          </h1>

          <h1 className="py-3 text-xl font-semibold  ">Follow Us</h1>

          <h1 className="py-0.5 hover:text-[#00bFFF] hover:cursor-pointer flex gap-3.5 items-center">
            <img className="h-[1rem]" src={x} alt="" />
            <img className="h-[1rem]" src={link} alt="" />
            <img className="h-[1rem]" src={insta} alt="" />
          </h1>
        </div>
      </div>
      <div className="h-[0.02rem] w-[80%] bg-gray-500/80 my-[1.5rem] mx-auto"></div>

      <p className="text-sm text-center font-medium pb-[1.5rem]">
        © {new Date().getFullYear()} ShoppyGlobe — Your world, your cart, powered by Ushnika. 🚀🛒
      </p>
    </div>
  );
}

export default Footer;
