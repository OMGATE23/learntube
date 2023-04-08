import React from 'react'
import Sidebar from '../../components/Sidebar'
import data from '../../data/explorePlaylist.json'

const Explore = () => {
  return (
    <div className='flex'>
        
        <Sidebar/>
        <div className=' mx-auto mb-20 w-[90%]'>
            <div className=' flex  items-center justify-center h-[5rem]'>
                <label className=' w-2/3 flex items-center gap-4 justify-center'>
                    <span className='text-xl'>Search: </span>
                    <input className='outline outline-1 px-4 text-gray-800 outline-gray-600 rounded-xl bg-gray-100 w-4/5 h-[2.5rem]' type='text' />
                </label>
            </div>
        <div className='grid grid-cols-1 w-[80%] mx-auto md:grid-cols-3 gap-4 justify-items-center'>
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

export default Explore