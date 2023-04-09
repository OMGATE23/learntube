import React, { useEffect, useState } from "react";
import data from "../../data/playlistData.json";
import Sidebar from "../../components/Sidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { enrollPlaylistById, getPlaylistById } from "../../helper";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/showtoast";

const PlaylistView = () => {
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(19);
  const [data, setData] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function enrollPlaylist(){
    await enrollPlaylistById(id)
    showToast("Enrolled successfully!")
    navigate(`/playlistwatch/${id}`)
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const playlistData = await getPlaylistById(id);
        setData(playlistData);
      } catch(err) {
      }
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  let displayList = data.contents;

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
      <div className="w-[70%] mx-auto">
        <div className="w-[70%] mx-auto">
          <h1 className="text-white my-6 text-4xl font-semibold">
            {data.title}
          </h1>
          {
            data?.contents && data?.contents.length > 0 && (
              <button onClick = {enrollPlaylist} className="text-lg transition-colors duration-150 mb-4 border flex gap-1 border-gray-700 py-2 px-4 rounded-xl hover:bg-green-600">
            {" "}
            <ArrowDownOnSquareIcon width={20} className="text-white" />{" "}
            <span className="hidden md:block text-white">Enroll Me</span>
          </button>
            )
          }
        </div>

        <div className="w-[70%] mx-auto grid grid-cols-1  justify-items-start">
          {displayList &&
            displayList.slice(lower, upper).map((video) => {
              let { lengthText, thumbnails, title, videoId } = video.video;
              return (
                <div
                  key={videoId}
                  className=" w-[90%]  transition-colors duration-150 my-4 border border-gray-800 rounded-xl shadow-lg p-4 flex items-center lg:items-start flex-col gap-4 lg:flex-row"
                >
                  <img src={thumbnails[1].url} alt={title} />
                  <div className="text-center lg:text-left">
                    <p className="text-gray-200">{title}</p>
                    <p className="text-gray-400">{lengthText}</p>
                  </div>
                </div>
              );
            })}
        </div>

        {data && data.length!==0 && data?.contents && (
          <div className="flex w-fit mx-auto gap-6  my-6">
            <button
              className="rounded-xl transition-all duration-200 hover:bg-gray-200 flex items-center outline-1 outline py-2 px-4 disabled:text-gray-500 disabled:cursor-not-allowed text-white hover:text-black"
              disabled={lower === 0}
              onClick={() => {
                setLower((prev) => prev - 20);
                setUpper((prev) => prev - 20);
              }}
            >
              {" "}
              <ArrowLeftIcon width={20} />
              Prev
            </button>
            <button
              className="rounded-xl transition-all duration-200 hover:bg-gray-200 flex items-center outline-1 outline py-2 px-4 disabled:text-gray-500 disabled:cursor-not-allowed text-white hover:text-black"
              disabled={upper === data.length - 1}
              onClick={() => {
                setUpper((prev) => {
                  if (prev + 20 > data.length) {
                    return data.length;
                  } else {
                    return prev + 20;
                  }
                });
                setLower((prev) => prev + 20);
              }}
            >
              <ArrowRightIcon width={20} />
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistView;
