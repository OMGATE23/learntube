import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [user]);

  return (
    <div>
      <Sidebar />
      <div>
        Dashboard
      </div>
    </div>
  )
}

export default Dashboard