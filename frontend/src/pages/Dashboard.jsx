import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import DeadlineSection from "../components/DeadlineSection/DeadlineSection";
import StatsPanel from "../components/StatsPanel/StatsPanel";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { courseApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";

const Dashboard = () => {
  const { token, isAuthenticated } = useAuth();

  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!token || !isAuthenticated) {
        setCourseCount(0);
        setLoading(false);
        return;
      }

      try {
        const data = await courseApi.getAll(token);
        setCourseCount(data.courses?.length || 0);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setCourseCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [token, isAuthenticated]);

  return (
    <div className="app">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DeadlineSection />

              <StatsPanel courseCount={courseCount} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;