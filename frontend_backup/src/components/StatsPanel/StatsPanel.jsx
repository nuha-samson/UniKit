import React from "react";
import "./StatsPanel.css";

const StatsPanel = ({ courseCount = 0 }) => {
  return (
    <>
      <div className="right-panel-tablet">
        <div className="right-panel-inner">
          <h3>Quick Stats</h3>

          <div className="stat-item">
            <span>📚 Courses</span>
            <span className="stat-number">{courseCount}</span>
          </div>

          <div className="stat-item">
            <span>📋 Assignments</span>
            <span className="stat-number">0</span>
          </div>

          <div className="stat-item">
            <span>⏰ Deadlines</span>
            <span className="stat-number">0</span>
          </div>
        </div>
      </div>

      <aside className="right-panel">
        <div className="right-panel-inner">
          <h3>Quick Stats</h3>

          <div className="stat-item">
            <span>📚 Courses</span>
            <span className="stat-number">{courseCount}</span>
          </div>

          <div className="stat-item">
            <span>📋 Assignments</span>
            <span className="stat-number">0</span>
          </div>

          <div className="stat-item">
            <span>⏰ Deadlines</span>
            <span className="stat-number">0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StatsPanel;