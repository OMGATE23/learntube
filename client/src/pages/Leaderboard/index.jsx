import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { getLeaderboard } from '../../helper'

const Leaderboard = () => {
    useEffect(() => {
        getLeaderboard()
    } , [])
  return (
    <div className='flex'>
        <Sidebar/>
        Leaderboard
    </div>
  )
}

export default Leaderboard