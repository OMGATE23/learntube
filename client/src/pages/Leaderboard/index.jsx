import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getLeaderboard } from "../../helper";
import Leaderboard from "../../components/Leaderboardd";

const index = () => {

  const [topLearners, setTopLearners] = useState([]);
  const [totalLearners, setTotalLearners] = useState();
console.log("here")
  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard();
      console.log("Data", data);
      setTopLearners(data.users);
      setTotalLearners(data.length);
    }
    fetchLeaderboard();
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[90%]">
          <Leaderboard topLearners={topLearners} totalLearners={totalLearners} />
      </div>
    </div>
  );
};

export default index;
