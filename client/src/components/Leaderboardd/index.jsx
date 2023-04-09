import React, { useEffect, useState } from "react";
import Users from "../../assets/users.png";
import Card from "./Card";
import "./index.css";

const Leaderboard = ({ topLearners, totalLearners }) => {
  return (
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
                totalSections={topLearner.points}
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
  );
};

export default Leaderboard;
