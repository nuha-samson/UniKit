import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileTriggerClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <div className="sidebar-mobile-trigger" onClick={handleMobileTriggerClick}>
        <span>☰</span> Menu
      </div>
      <aside className={`sidebar ${isMobileSidebarOpen ? "sidebar-mobile-open" : ""}`}>
        <ul className="sidebar-list">
          <li><span className="icon">◇</span> Dashboard</li>
          <li className="active"><span className="icon">▣</span> Courses</li>
          <li><span className="icon">📋</span> Assignments</li>
          <li><span className="icon">📝</span> Exams</li>
          <li><span className="icon">📅</span> Calendar</li>
        {/**  <li><span className="icon">📘</span> Notes</li>  */}
          <li><span className="icon">⚙</span> Settings</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;