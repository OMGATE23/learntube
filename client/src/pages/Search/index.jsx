import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

import { getPlaylistBySearch } from "../../helper";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";

const Search = () => {
  const [query , setQuery] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [user]);

  async function handleSearch(){
    setLoading(true);
    try {
      if(query){
        const playlistData = await getPlaylistBySearch(query)
        setData(playlistData.contents)
      }
    } catch(err) {

    } finally {
      setLoading(false);
    }
  }

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
              onChange = {(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="text-lg text-white border flex gap-1 border-gray-700 py-2 px-6 rounded-xl">
              {" "}
              <MagnifyingGlassIcon width={20} />{" "}
              <span className="hidden md:block">Search</span>
            </button>
          </label>
        </div>
        {loading && <Loader />}
        <div className='grid grid-cols-1 w-[80%] mx-auto my-4 mb-12 lg:grid-cols-3 gap-4 justify-items-center'>
        {
            data && !loading && data.map(playlist => {
                let {channelName , playlistId , thumbnails,  title , videoCount} = playlist.playlist

                if(title.length > 30){
                    title = title.substring(0 , 27) + '...' 
                }

                if(channelName.length > 20) {
                    channelName = channelName.substring(0 , 17) + "..."
                }
                return(
                    <Link to={"/playlistview/" + playlistId} key = {playlistId} className=' transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 '>
                        <img src = {thumbnails[3].url} alt = {title}/>
                        <p className='text-lg mt-4 text-white'>{title}</p>
                        <p className='text-gray-400'>{channelName}</p>
                        <p className="text-gray-500">No of videos : {videoCount}</p>
                    </Link>
                )
            })
        }
        </div>
      </div>
    </div>
  );
};

export default Search;
