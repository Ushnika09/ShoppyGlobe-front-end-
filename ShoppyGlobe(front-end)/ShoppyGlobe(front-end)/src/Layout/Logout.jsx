import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect to Home
    }, 2500); // wait 2.5s

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <p className="text-2xl font-bold text-gray-800 text-center">
         You’ve been logged out
      </p>
      <p className="text-md text-gray-600 text-center">
        Redirecting you to the <span className="text-[#00BFFF] font-medium">Home Page</span>...
      </p>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00BFFF]"></div>
    </div>
  );
}

export default Logout;
