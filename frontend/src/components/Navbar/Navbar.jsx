import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAcademicPeriod } from "../../utils/semester";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const academicPeriod = getAcademicPeriod();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">UniKit</div>

        <div className="semester">
          {academicPeriod.label}
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="settings-button"
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>

        <div className="user-section">
          <span className="user-name">
            {user?.name || "Student"}
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;