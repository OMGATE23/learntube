import React from "react";
import Sidebar from "../../components/Sidebar";

const LandingPage = () => {
  return (
    <div>
      <div className="h-[100vh] flex flex-col justify-center outline outline-2 bg-gray-50 text-center">
        <h1 className="text-8xl font-bold">
          <span className="text-red-600">YouTube</span>{" "}
          <span className="text-gray-900">Courses</span>
        </h1>
        <p className="mt-2 text-gray-700 text-lg">
          "Unlock the Power of YouTube Learning with Our Course-Boosting App!"
        </p>
        <a
          href="/signin"
          className=" transition-all duration-200 border-2 w-[10rem] py-2 mt-6 text-lg font-semibold border-gray-800 rounded-2xl mx-auto hover:text-white hover:bg-gray-800"
        >
          Sign In!
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
