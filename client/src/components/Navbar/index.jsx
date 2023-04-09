import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="pl-10 py-2 border-b border-gray-600">
      <Link to="/" className="flex items-center">
        <img src="./logo.png" alt="" width="40" height="40" />
        <p className="ml-2">
          <span className="text-white">Youtube</span>
          <span className="text-red-600">Learn</span>
        </p>
      </Link>
    </div>
  );
};

export default Navbar;
