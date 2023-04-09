import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { BarChart } from "../../components/Chart";
import { getDashboardData } from "./getDashboardData";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    enrolledPlaylistCount: 0,
    videoCount: 0,
    analysis: {
      "Sunday": 0,
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
  }

});

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }

    if(user) {
      fetchUser();
    }
  }, [user]);

  async function fetchUser() {
    const res = await fetch(`${API_URL}/user/dashboard`, {
      headers: { authorization: user.accessToken },
    });

    const data = await res.json();

    const dashboardData = getDashboardData(data.userProgress);
    setDashboardData(dashboardData)
  }

  const userName = JSON.parse(localStorage.getItem("user")).name;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">

      <h1 className="text-2xl text-white font-semibold px-8 mt-8 mb-4">Hello {userName} 👋</h1>

      <div className="h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <div className="w-[70%] h-[70vh] rounded-xl px-8 py-4 ml-6 shadow-2xl  text-white border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 ">
          <BarChart chartData={Object.values(dashboardData.analysis)} />
        </div>

        <div className="w-[30%] text-white flex flex-col items-center gap-8">
          <div className="flex flex-col rounded-xl text-2xl justify-center gap-6 w-[250px] aspect-square text-center border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 ">
            No.of Playlists <div className="text-5xl">{dashboardData.enrolledPlaylistCount}</div>
          </div>
          <div className="flex flex-col rounded-xl text-2xl justify-center gap-6 w-[250px] aspect-square text-center px-2 border-2 border-[rgba(30,224,224,.2)] bg-base-100/10 bg-gradient-to-r from-transparent to-base-100/50 ">
            Videos Watched <div className="text-5xl">{dashboardData.videoCount}</div>
          </div>
        </div>
        
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
