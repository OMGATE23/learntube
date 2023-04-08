import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import data from '../../data/enrolledPlaylists.json'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const EnrolledPlaylist = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [user]);

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-[70%]  mb-12 mx-auto'>
            <h1 className='my-6 text-gray-900 text-4xl font-semibold'>Enrolled Playlists</h1>
            <div className='grid grid-cols-1 w-[90%] mx-auto md:grid-cols-3 gap-8 justify-items-center'>
        {
            data.map(playlist => {
                let {channelName , playlistId , thumbnails,  title , videoCount} = playlist

                if(title.length > 30){
                    title = title.substring(0 , 28) + '...' 
                }

                if(channelName.length > 20) {
                    channelName = channelName.substring(0 , 17) + "..."
                }
                return(
                    <div key = {playlistId} className=' transition-all duration-200  w-[300px] h-[300px] text-center rounded-xl shadow-xl p-6 hover:cursor-pointer hover:bg-gray-100'>
                        <img src = {thumbnails[3].url} alt = {title}/>
                        <p className='text-lg mt-4'>{title}</p>
                        <p className='text-gray-700'>{channelName}</p>
                        <p>No of videos : {videoCount}</p>
                        
                    </div>
                )
            })
        }
        </div>
        </div>
    </div>
  )
}

export default EnrolledPlaylist