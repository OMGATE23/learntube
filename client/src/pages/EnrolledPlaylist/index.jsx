import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  getEnrolledPlaylists,
  getPlaylistById,
  getPlaylistBySearch,
} from "../../helper";
import Loader from "../../components/Loader";

const EnrolledPlaylist = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function enrolledPlaylistHandler() {
    setLoading(true);

    try {
    const list = await getEnrolledPlaylists(user.accessToken);
    const response = await getPlaylistBySearch(list[0]);
    console.log(response.contents[0].playlist);

    const data = [];

    for (let i = 0; i < list.length; i++) {
      const response = await getPlaylistBySearch(list[i]);
      console.log(i, list[i], response);
      if (response.contents && response.contents[0]) {
        data.push(response.contents[0].playlist);
      }
    }
    console.log(data);
    setPlaylistData(data);
  } catch(err) {

  } finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }

    if(user) {
      enrolledPlaylistHandler();
    }

  }, [user]);

  if(loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-[90%">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[70%]  mb-12 mx-auto">
        <h1 className="my-6 text-4xl font-semibold text-white">
          Enrolled Playlists
        </h1>
        <div className="grid grid-cols-1 w-[90%] mx-auto md:grid-cols-3 gap-8 justify-items-center">
          {playlistData &&
            playlistData.map((playlist) => {
              let { channelName, playlistId, thumbnails, title, videoCount } =
                playlist;

              if (title.length > 30) {
                title = title.substring(0, 28) + "...";
              }

              if (channelName.length > 20) {
                channelName = channelName.substring(0, 17) + "...";
              }
              return (
                <Link
                  to={"/playlistwatch/" + playlistId}
                  key={playlistId}
                  className=" transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer
                  border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 "
                >
                  <img src={thumbnails[3].url} alt={title} />
                  <p className="text-gray-200 mt-4">{title}</p>
                  <p className="text-gray-300">{channelName}</p>
                  <p className="text-gray-400">No of videos : {videoCount}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EnrolledPlaylist;
