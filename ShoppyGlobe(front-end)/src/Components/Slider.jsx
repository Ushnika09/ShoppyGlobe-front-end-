import React, { useState, useEffect } from "react";
import i1 from "../assets/1.jpg";
import i2 from "../assets/2.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";

function Slider() {
  const arr = [i1, i2, i3, i4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % arr.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[400px] relative overflow-hidden ">
      
      <img
        src={arr[index]}
        alt="slider"
        className="w-full h-full object-cover transition-all duration-700"
      />
      {/* overlay */}
      <div className="bg-black/45 inset-0 absolute "></div>

      <div className="absolute flex flex-col top-20 justify-center items-center w-full text-center p-[1rem]">
        <h1 className="md:text-5xl md:font-extrabold text-4xl font-bold text-gray-50 py-[1.5rem]">Welcome to  

            <span className="text-[#00BFFF]"> ShoppyGlobe</span></h1>
        <h1 className="text-gray-200 md:text-[1.2rem] text-wrap text-center md:px-[180px] px-[50px] text-[1rem]">Discover amazing products at unbeatable prices. Shop from thousands of items across multiple categories.</h1>
      </div>

      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {arr.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === i ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
