import React, { useEffect, useState } from "react";
import data from "../../data/playlistData.json";
import Sidebar from "../../components/Sidebar";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { addPoint, getPlaylistById, updateVideoProgress } from "../../helper";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/showtoast";
import Modal from "../../components/TweetShareModal";
import ConfettiContainer from "../../components/Confetti";

const PlaylistWatch = () => {
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(19);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
  const [progressVideoList, setProgressVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let displayList;

  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function handleProgress(videoId) {
    const response = await updateVideoProgress(id, videoId);
    showToast("Progress marked successfully!");
    getProgress();
    setShowModal(true);
    const responsePoints = await addPoint(user.accessToken)
    console.log(responsePoints)
    
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    if (user) {
      getProgress();
    }
  }, [user]);

  async function getProgress() {
    try {
      const res = await fetch(`${API_URL}/user/getprogress/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + user.accessToken,
        },
      });
      const data = await res.json();
      setProgressVideoList(data.userProgress.video_id);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePlaylist() {
    setLoading(true);
    const playlist = await getPlaylistById(id);
    setData(playlist);
    setLoading(false);
  }
  useEffect(() => {
    handlePlaylist();
  }, []);

  useEffect(() => {
    setCurrentVideo(data?.contents[0].video.videoId);
  }, [data]);
  displayList = data?.contents || [];
  displayList = displayList?.slice(lower, upper);
  const doneVideos = progressVideoList.map((el) => el.videoId);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-[90%]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      {data && (
        <div className="w-[90%]">
          <h1 className="text-3xl mt-8 ml-6 font-bold text-white">
            {data?.title}
          </h1>
          <div className=" flex mt-8 flex-col lg:flex-row">
            <div className=" w-[90%] lg:w-2/3 mb-12 mx-auto  lg:ml-8">
              <div className="shadow-xl mx-auto py-4 px-6 border border-gray-500 bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50">
                <iframe
                  className="w-full aspect-video"
                  src={"https://www.youtube.com/embed/" + currentVideo}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <p className="text-2xl font-medium ml-4 mt-2 mb-2 text-gray-300">
                  {data?.title}
                </p>
                {/* {data && (
                  <p className="w-[95%] ml-4 text-gray-700">
                    {showMore && data
                      ? data?.description
                      : data?.description.slice(0, 100) + "..."}
                  </p>
                )} */}
                <button
                  className="ml-4 text-gray-400"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  Show {!showMore ? <span>More</span> : <span>Less</span>}
                </button>
              </div>
            </div>
            {
              <div className="w-full lg:w-1/3 mx-auto h-[80vh] overflow-y-scroll">
                <div className="w-[80%] mx-auto grid grid-cols-1  justify-items-center ">
                  {displayList &&
                    displayList.map((video) => {
                      let { lengthText, title, videoId } = video.video;
                      if (title.length > 40) {
                        title = title.substring(0, 37) + "...";
                      }
                      return (
                        <div
                          key={Math.random()}
                          className=" w-[90%] transition-colors duration-150 my-4 border border-gray-800 rounded-lg shadow-lg p-4 flex flex-row items-center gap-4 justify-center"
                        >
                          <input
                            type="checkbox"
                            onClick={(e) => {
                              e.target.checked = true
                              handleProgress(videoId);
                              e.target.disabled = true;
                            }}
                            checked={doneVideos.includes(videoId)}
                            disabled={doneVideos.includes(videoId)}
                          />
                          <div
                            onClick={() => setCurrentVideo(videoId)}
                            className="w-[80%] text-center hover:cursor-pointer lg:text-left"
                          >
                            <p className="text-gray-300">{title}</p>
                            <p className="text-gray-400">{lengthText}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="flex w-fit mx-auto gap-6  my-6">
                  <button
                    className="rounded-xl transition-all duration-200 hover:bg-gray-200 flex items-center outline-1 outline py-2 px-4 disabled:text-gray-500 disabled:cursor-not-allowed"
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
                    className="rounded-xl transition-all duration-200 hover:bg-gray-200 flex items-center outline-1 outline py-2 px-4 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={upper === data.contents.length - 1}
                    onClick={() => {
                      setUpper((prev) => {
                        if (prev + 20 > data.contents.length) {
                          return data.contents.length;
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
              </div>
            }
          </div>
        </div>
      )}
      {showModal && (
        <>
          <Modal
            closeModal={() => setShowModal(false)}
            shareText={`Hey there👋 I'm making progress in learning through the ${
              data?.title ?? "Yotube"
            } playlist 🎊 Join my journey!`}
          />
          <ConfettiContainer />
        </>
      )}
    </div>
  );
};

export default PlaylistWatch;
