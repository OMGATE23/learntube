import React, { useState } from "react";
import data from "../../data/playlistData.json";
import Sidebar from "../../components/Sidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";

const PlaylistView = () => {
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(19);
  let displayList = data.contents;
  displayList = displayList.slice(lower, upper);
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[70%] mx-auto">
        <div className="w-[70%] mx-auto">
          <h1 className="  my-6 text-gray-900 text-4xl font-semibold">
            {data.title}
          </h1>
          <button className="text-lg transition-colors duration-150 mb-4 border flex gap-1 border-gray-700 py-2 px-4 rounded-xl hover:bg-slate-200">
            {" "}
            <ArrowDownOnSquareIcon width={20} />{" "}
            <span className="hidden md:block">Enroll Me</span>
          </button>
        </div>

        <div className="w-[70%] mx-auto grid grid-cols-1  justify-items-start">
          {displayList.map((video) => {
            let { lengthText, thumbnails, title, videoId } = video.video;
            return (
              <div
                key={videoId}
                className=" w-[90%]  transition-colors duration-150 my-4 border border-gray-800 rounded-xl shadow-lg p-4 flex items-center lg:items-start flex-col gap-4 lg:flex-row"
              >
                <img src={thumbnails[1].url} alt={title} />
                <div className="text-center lg:text-left">
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
  );
};

export default PlaylistView;
