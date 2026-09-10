import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { courseApi, deadlineApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getDeadlineUrgency } from "../utils/deadline";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [courseData, deadlineData] = await Promise.all([
          courseApi.getAll(token),
          deadlineApi.getAll(token),
        ]);
        setCourses(courseData.courses || []);
        setDeadlines(deadlineData.deadlines || []);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const activeDeadlines = deadlines
    .filter((deadline) => !deadline.completedAt)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const nextDeadline = activeDeadlines[0];

  const totalCredits = courses.reduce((sum, course) => sum + Number(course.credits || 0), 0);
  const assignmentCount = activeDeadlines.filter((deadline) => deadline.type === "assignment").length;

  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-main">
          <section className="dashboard-intro">
            <span className="eyebrow">YOUR ACADEMIC OVERVIEW</span>
            <h1>Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.</h1>
            <p>Stay focused on what needs your attention next.</p>
          </section>

          {loading ? (
            <div className="dashboard-empty">Loading your dashboard...</div>
          ) : (
            <>
              <section className="next-deadline">
                <div className="next-deadline-header">
                  <div>
                    <span className="eyebrow">NEXT DEADLINE</span>
                    <h2>{nextDeadline ? nextDeadline.title : "You're all caught up"}</h2>
                  </div>
                  <button className="secondary-action" onClick={() => navigate("/deadlines")}>
                    View Deadlines
                  </button>
                </div>

                {nextDeadline ? (
                  <div className="next-deadline-body">
                    <div>
                      <strong>{nextDeadline.course?.code || nextDeadline.course?.name || "Course"}</strong>
                      <span>{nextDeadline.type}</span>
                      <span>Priority: {nextDeadline.priority}</span>
                    </div>
                    <div className="next-deadline-right">
                      <span className={`deadline-urgency ${getDeadlineUrgency(nextDeadline.dueDate).level}`}>
                        {getDeadlineUrgency(nextDeadline.dueDate).label}
                      </span>
                      <strong>
                        {new Date(nextDeadline.dueDate).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="caught-up">
                    <p>No upcoming deadlines.</p>
                    <button className="primary-action" onClick={() => navigate("/deadlines")}>+ Add Deadline</button>
                  </div>
                )}
              </section>

              <section className="dashboard-stats">
                <div className="dashboard-stat">
                  <span>Courses</span>
                  <strong>{courses.length}</strong>
                </div>
                <div className="dashboard-stat">
                  <span>Credits</span>
                  <strong>{totalCredits}</strong>
                </div>
                <div className="dashboard-stat">
                  <span>Deadlines</span>
                  <strong>{activeDeadlines.length}</strong>
                </div>
                <div className="dashboard-stat">
                  <span>Assignments</span>
                  <strong>{assignmentCount}</strong>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;