import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const LandingPage = () => {
  return (
    <div className="bg-backgroundClr">
      <Navbar />
      <div className="h-[90vh] flex flex-col justify-center items-center text-center">
        <img src="./logo.png" alt="LearnTube logo" width="120" height="120" />
        <h1 className="text-8xl font-bold">
          <span className="text-white">Learn</span>
          <span className="text-red-600">Tube</span>
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Unlock the Power of YouTube Learning with Our Course-Boosting App!
        </p>
        <a
          href="/signin"
          className=" transition-all bg-red-600 duration-200 border-2 py-2 px-8 mt-6 text-lg font-medium border-gray-800 rounded-lg mx-auto hover:text-white hover:bg-gray-800"
        >
          Get Started!
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
