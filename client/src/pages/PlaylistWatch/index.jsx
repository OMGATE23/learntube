import React, { useEffect, useState } from "react";
import data from "../../data/playlistData.json";
import Sidebar from "../../components/Sidebar";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const PlaylistWatch = () => {
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(19);
  
  const [showMore , setShowMore] = useState(false)


  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [user]);

  let displayList = data.contents;
  console.log(displayList)
  const [currentVideo , setCurrentVideo] = useState(displayList[0].video.videoId)
  displayList = displayList.slice(lower, upper);
  

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">
        <h1 className="text-3xl mt-8 ml-6 font-bold text-gray-900">Video Section</h1>
      <div className=" flex mt-8 flex-col lg:flex-row">
        <div className=" w-[90%] lg:w-2/3 mb-12 mx-auto  lg:ml-8">
            <div className="bg-gray-200 shadow-xl mx-auto py-4 px-6">
            <iframe
            className="w-full aspect-video"
            src={"https://www.youtube.com/embed/" + currentVideo}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p className="text-2xl font-medium ml-4 mt-2 mb-2">Video Title</p>
          <p className="w-[95%] ml-4 text-gray-700">
            { showMore ?data.description : data.description.slice(0,100) + "..."}
          </p>
          <button className="ml-4" onClick={() => setShowMore(prev => !prev)}>Show {
            !showMore ? <span>More</span> : <span>Less</span>
          }</button>
            </div>
          
        </div>
        <div className=" w-full lg:w-1/3 mx-auto">
          <div className="w-[80%] mx-auto grid grid-cols-1  justify-items-center ">
            {displayList.map((video) => {
              let { lengthText, thumbnails, title, videoId } = video.video;
              if (title.length > 40) {
                title = title.substring(0, 37) + "...";
              }
              return (
                <div
                  key={videoId}
                  className=" w-[90%] transition-colors duration-150 my-4 border border-gray-800 rounded-lg shadow-lg p-4 flex flex-row items-center gap-4 justify-center hover:bg-slate-100  "
                  
                >
                    <input type= "checkbox" />
                  <div onClick={() => setCurrentVideo(videoId)} className="w-[80%] text-center hover:cursor-pointer lg:text-left">
                    
                    <p>{title}</p>
                    <p>{lengthText}</p>
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
      </div>
      </div>
      
    </div>
  );
};

export default PlaylistWatch;
