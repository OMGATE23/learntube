import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import data from "../../data/explorePlaylist.json";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";

const Explore = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className=" mx-auto mb-20 w-[90%]">
        <div className=" flex mr-12 items-center justify-end h-[5rem]">
          <Link
            to="/search"
            className="text-lg transition-all duration-200 border flex gap-1 border-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200"
          >
            <span className="hidden md:block">Go to Search</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 w-[80%] mx-auto md:grid-cols-3 gap-4 justify-items-center">
          {data.map((playlist) => {
            console.log(playlist.playlist);
            let { channelName, playlistId, thumbnails, title, videoCount } =
              playlist.playlist;

            if (title.length > 30) {
              title = title.substring(0, 27) + "...";
            }

            if (channelName.length > 20) {
              channelName = channelName.substring(0, 17) + "...";
            }
            return (
              <div
                key={playlistId}
                className=" transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer hover:bg-gray-100"
              >
                <img src={thumbnails[3].url} alt={title} />
                <p className="text-lg mt-4">{title}</p>
                <p className="text-gray-700">{channelName}</p>
                <p>No of videos : {videoCount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
