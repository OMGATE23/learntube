import React from "react";
import Sidebar from "../../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import data from '../../data/explorePlaylist.json'

const Search = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[80%]">
        <div className=" flex  items-center justify-center h-[5rem]">
          <label className=" w-2/3 flex items-center gap-4 justify-center">
            <input
              className="outline outline-1 px-4 text-gray-800 outline-gray-600 rounded-xl bg-gray-100 w-4/5 h-[2.5rem]"
              type="text"
              placeholder="Search Playlists"
            />
            <button className="text-lg border flex gap-1 border-gray-700 py-2 px-4 rounded-xl">
              {" "}
              <MagnifyingGlassIcon width={20} />{" "}
              <span className="hidden md:block">Search</span>
            </button>
          </label>
        </div>
        <div className='grid grid-cols-1 w-[80%] mx-auto my-4 mb-12 lg:grid-cols-3 gap-4 justify-items-center'>
        {
            data.map(playlist => {
                console.log(playlist.playlist)
                let {channelName , playlistId , thumbnails,  title , videoCount} = playlist.playlist

                if(title.length > 30){
                    title = title.substring(0 , 27) + '...' 
                }

                if(channelName.length > 20) {
                    channelName = channelName.substring(0 , 17) + "..."
                }
                return(
                    <a href="" key = {playlistId} className=' transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer hover:bg-gray-100'>
                        <img src = {thumbnails[3].url} alt = {title}/>
                        <p className='text-lg mt-4'>{title}</p>
                        <p className='text-gray-700'>{channelName}</p>
                        <p>No of videos : {videoCount}</p>
                    </a>
                )
            })
        }
        </div>
      </div>
    </div>
  );
};

export default Search;
