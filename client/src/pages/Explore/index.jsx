import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import data from "../../data/explorePlaylist.json";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { MagnifyingGlassIcon   } from "@heroicons/react/24/outline";
import { getPlaylistBySearch } from "../../helper";

const Explore = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [data , setData] = useState()

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  async function handleExplore() {
    let user = JSON.parse(localStorage.getItem('user'))
    const response = await getPlaylistBySearch(user.category)
    setData(response.contents)
  }

  useEffect(() => {
      handleExplore() 
  } , [])
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-auto mb-20 w-[90%]">
        <div className="flex items-center justify-between w-[80%] mx-auto my-5 px-2">
          <h1 className="text-white font-semibold text-2xl">Explore</h1>
          <Link
            to="/search"
            className="text-lg transition-all duration-200 border flex gap-1 border-gray-700 py-2 px-6 rounded-xl hover:bg-gray-200 text-white hover:text-black"
          >
            <span className="hidden md:block mr-2">Search</span>
            <MagnifyingGlassIcon className="w-[26px] lg:w-[20px]" width={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 w-[80%] mx-auto md:grid-cols-3 gap-4 justify-items-center">
          {data && data.map((playlist) => {
            let { channelName, playlistId, thumbnails, title, videoCount } =
              playlist.playlist;

            if (title.length > 30) {
              title = title.substring(0, 27) + "...";
            }

            if (channelName.length > 20) {
              channelName = channelName.substring(0, 17) + "...";
            }
            return (
              <Link
                to={`/playlistview/${playlistId}`}
                key={playlistId}
                className=" transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 "
              >
                <img src={thumbnails[3].url} alt={title} />
                <p className="text-lg mt-4 text-white">{title}</p>
                <p className="text-gray-400">{channelName}</p>
                <p className="text-gray-500">No of videos : {videoCount}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
