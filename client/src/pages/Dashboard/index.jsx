import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

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

  return (
    <div>
      <Sidebar />
      <div>Dashboard

        <button onClick={fetchUser}>Get user</button>
      </div>
    </div>
  );
};

export default Dashboard;
