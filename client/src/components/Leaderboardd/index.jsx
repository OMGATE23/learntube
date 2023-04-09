import React, { useEffect, useState } from "react";
import Users from "../../assets/users.png";
import Card from "./Card";
import "./index.css";
import Sidebar from "../Sidebar";
import Loader from "../Loader";
import { useAuthContext } from "../../hooks/useAuthContext";

const Leaderboard = () => {
  const [topLearners, setTopLearners] = useState();
  const [totalLearners, setTotalLearners] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchRoadmaps() {
      setLoading(true);
      const res = await api.get("leaderboard", {
        headers: { Authorization: user.accessToken },
      });
      setLoading(false);
      setTopLearners(res.data.users);
      setTotalLearners(res.data.count);
    }

    fetchRoadmaps();
  }, [user]);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-[90%]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">
        <div className="leaderboard-container">
          <div className="leaderboard">
            <h1>Leaderboard 🏆</h1>
            <div className="leaderboard-card-container">
              {topLearners &&
                topLearners.map((topLearner, idx) => (
                  <Card
                    key={topLearner._id}
                    rank={idx + 1}
                    name={topLearner.name}
                    profileUrl={topLearner.displayPicture}
                    totalSections={topLearner.progressStat}
                  />
                ))}
            </div>
          </div>
          <div className="stats">
            <div>
              <img src={Users} alt="" />
              <p className="stats-title">Total Learners</p>
              <p className="stats-count">{totalLearners}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
