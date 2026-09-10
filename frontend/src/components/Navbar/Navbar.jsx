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
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="logo">UniKit</span>
        <span className="academic-period">{academicPeriod.label}</span>
      </div>
      <div className="navbar-actions">
        <span className="navbar-user">{user?.name || "Student"}</span>
        <button className="navbar-logout" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;