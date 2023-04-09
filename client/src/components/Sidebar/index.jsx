import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentIcon ,ComputerDesktopIcon , MagnifyingGlassIcon , VideoCameraIcon , ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { auth } from "../../config/firebase";

const Sidebar = () => {

  const navigate = useNavigate();

  async function logout() {
    try {
      await auth.signOut();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=" sticky top-0 left-0 h-[100vh] w-[5rem] lg:w-[20%] flex items-center border-r border-gray-500 text-white">
      

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
        <button 
          className="block"
          onClick={logout}
        >
          <div className="flex justify-center lg:justify-start gap-4  w-2/3 mx-auto my-4 lg:my-0">
            <ArrowRightOnRectangleIcon className="w-[26px] lg:w-[20px]" width={20} />
            <span className="hidden lg:block  py-3 text-center text-xl ">
              Sign Out
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
