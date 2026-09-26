import React from "react";

const StatsCard = ({ title, value, onClick }) => {
  return (
    <div className="stats-card clickable-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;
