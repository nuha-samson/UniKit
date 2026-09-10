import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import DeadlineCard from "../../components/DeadlineSection/DeadlineCard";
import DeadlineModal from "../../components/DeadlineModal/DeadlineModal";
import { deadlineApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./deadlines.css";

const Deadlines = () => {
  const { token } = useAuth();

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  const loadDeadlines = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await deadlineApi.getAll(token);
      setDeadlines(data.deadlines || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeadlines();
  }, [token]);

  const openAdd = () => {
    setSelectedDeadline(null);
    setShowModal(true);
  };

  const openEdit = (deadline) => {
    setSelectedDeadline(deadline);
    setShowModal(true);
  };

  const toggleComplete = async (deadline) => {
    try {
      await deadlineApi.update(token, deadline._id, { completed: !deadline.completedAt });
      await loadDeadlines();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDeadline = async (id) => {
    try {
      await deadlineApi.delete(token, id);
      setDeadlines((current) => current.filter((deadline) => deadline._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const grouped = useMemo(() => {
    const sorted = [...deadlines].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const groups = {};

    sorted.forEach((deadline) => {
      const date = new Date(deadline.dueDate);
      const key = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[key]) groups[key] = [];
      groups[key].push(deadline);
    });

    return groups;
  }, [deadlines]);

  const groups = Object.entries(grouped);

  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-main">
          <section className="page-heading">
            <div>
              <span className="eyebrow">ACADEMIC TRACKER</span>
              <h1>Deadlines</h1>
              <p>Keep assignments, quizzes, tests, exams, and study sessions organized.</p>
            </div>
            <button className="primary-action" onClick={openAdd}>+ Add Deadline</button>
          </section>

          {error && (
            <div className="page-error">
              {error}
              <button onClick={loadDeadlines}>Retry</button>
            </div>
          )}

          {loading ? (
            <div className="page-empty"><h2>Loading deadlines...</h2></div>
          ) : groups.length === 0 ? (
            <div className="page-empty">
              <h2>No deadlines yet</h2>
              <p>You're clear for now. Add your next academic task.</p>
              <button className="primary-action" onClick={openAdd}>+ Add Deadline</button>
            </div>
          ) : (
            <div className="deadline-groups">
              {groups.map(([date, items]) => (
                <section className="deadline-group" key={date}>
                  <div className="deadline-group-header">
                    <h2>{date}</h2>
                    <span>{items.length} {items.length === 1 ? "deadline" : "deadlines"}</span>
                  </div>
                  <div className="deadline-group-list">
                    {items.map((deadline) => (
                      <DeadlineCard
                        key={deadline._id}
                        deadline={deadline}
                        onEdit={openEdit}
                        onComplete={toggleComplete}
                        onDelete={deleteDeadline}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <DeadlineModal
          deadline={selectedDeadline}
          onClose={() => { setShowModal(false); setSelectedDeadline(null); }}
          onSaved={loadDeadlines}
          onDeleted={deleteDeadline}
        />
      )}
    </div>
  );
};

export default Deadlines;