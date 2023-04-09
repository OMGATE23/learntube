import React from "react";

const Navbar = () => {
  return (
    <div
      className="flex items-center pl-10 py-2 border-b border-gray-600"
    >
      <img src="./logo.png" alt="" width="40" height="40" />
      <p className="ml-2">
        <span className="text-white">Youtube</span>
        <span className="text-red-600">Learn</span>
      </p>
    </div>
  );
};

export default Navbar;
