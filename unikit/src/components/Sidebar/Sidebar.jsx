import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
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
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">◇</span> Dashboard</li>
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">▣</span> Courses</li>
          </NavLink>
          <NavLink to="/assignments" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">📋</span> Assignments</li>
          </NavLink>
          <NavLink to="/exams" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">📝</span> Exams</li>
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">📅</span> Calendar</li>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <li><span className="icon">⚙</span> Settings</li>
          </NavLink>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;