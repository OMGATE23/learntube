import React from "react";
import { Link } from "react-router-dom";
import { DocumentIcon ,ComputerDesktopIcon , MagnifyingGlassIcon , VideoCameraIcon , ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className=" sticky top-0 left-0 h-[100vh] w-[5rem] lg:w-[20%] flex items-center border-r-4 border-gray-200">
      

      <div className=" flex flex-col w-full mb-36">
        <Link to="/dashboard" className="block">
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <DocumentIcon className=" w-[26px] lg:w-[20px]" width={20} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Dashboard
            </span>
          </div>
        </Link>
        <Link to="/explore" className="block">
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <ComputerDesktopIcon className="  w-[26px] lg:w-[20px]" width={24} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Explore
            </span>
          </div>
        </Link>
        <Link to="/enrolledplaylist" className="block">
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <VideoCameraIcon className="w-[26px] lg:w-[20px]" width={20} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Playlists
            </span>
          </div>
        </Link>
        <Link to="/search" className="block">
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <MagnifyingGlassIcon className="w-[26px] lg:w-[20px]" width={20} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Search
            </span>
          </div>
        </Link>
        <Link to="" className="block">
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <ArrowRightOnRectangleIcon className="w-[26px] lg:w-[20px]" width={20} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Sign Out
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
