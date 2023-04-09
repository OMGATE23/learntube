import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { BarChart } from "../../components/Chart";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  async function fetchUser() {
    const apiRes = await axios.get(`${API_URL}/user/getuser`, {
      headers: { Authorization: user.accessToken },
    });
    console.log(apiRes);
  }

  async function fetchUser() {
    const res = await fetch(`${API_URL}/user/dashboard`, {
      headers: { authorization: user.accessToken },
    });

    const data = await res.json();

    console.log(data.userProgress);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">
      Dashboard <button onClick={fetchUser}>Get user</button>
      <div className=" h-screen flex items-center justify-center gap-12 outline border-2 border-white">
        
        <div className="w-[50%] rounded-xl px-8 py-4 outline outline-1 ml-6 shadow-2xl  text-white">
          <BarChart chartData={[1, 2, 3, 4, 5, 6, 6]} />
        </div>

        <div className="text-white flex flex-row md:flex-col gap-8">
          <div className="flex flex-col rounded-xl text-2xl justify-center gap-6 w-[220px] aspect-square outline outline-1 text-center">
            No.of Playlists <div className="text-5xl">3</div>
          </div>
          <div className="flex flex-col rounded-xl text-2xl justify-center gap-6 w-[220px] aspect-square outline outline-1 text-center px-2">
            Videos Watched <div className="text-5xl">17</div>
          </div>
        </div>
        
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
