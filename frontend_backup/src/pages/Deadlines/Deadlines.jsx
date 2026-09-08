import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import DeadlineCard from "../../components/DeadlineSection/DeadlineCard";
import DeadlineModal from "../../components/DeadlineModal/DeadlineModal";
import { deadlineApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./deadlines.css";

const Deadlines = () => {
  const { token, isAuthenticated } = useAuth();

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  const loadDeadlines = async () => {
    if (!token || !isAuthenticated) {
      setDeadlines([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await deadlineApi.getAll(token);

      setDeadlines(data.deadlines || []);
    } catch (err) {
      console.error("Failed to load deadlines:", err);
      setError(err.message || "Failed to load deadlines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeadlines();
  }, [token, isAuthenticated]);

  const handleAdd = () => {
    setSelectedDeadline(null);
    setShowModal(true);
  };

  const handleEdit = (deadline) => {
    setSelectedDeadline(deadline);
    setShowModal(true);
  };

  const handleComplete = async (deadline) => {
    try {
      await deadlineApi.update(token, deadline._id, {
        completed: !deadline.completedAt,
      });

      await loadDeadlines();
    } catch (err) {
      setError(err.message || "Failed to update deadline.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deadlineApi.delete(token, id);

      setDeadlines((previous) =>
        previous.filter((deadline) => deadline._id !== id)
      );
    } catch (err) {
      setError(err.message || "Failed to delete deadline.");
    }
  };

  const handleSaved = async () => {
    await loadDeadlines();
  };

  const groupedDeadlines = useMemo(() => {
    const activeDeadlines = deadlines
      .filter((deadline) => !deadline.completedAt)
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

    const groups = {};

    activeDeadlines.forEach((deadline) => {
      const date = new Date(deadline.dueDate);

      const key = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(deadline);
    });

    return groups;
  }, [deadlines]);

  const dateGroups = Object.entries(groupedDeadlines);

  return (
    <div className="app">
      <Navbar />

      <div className="deadlines-layout">
        <Sidebar />

        <main className="deadlines-main">
          <header className="deadlines-header">
            <div>
              <p className="deadlines-eyebrow">ACADEMIC TRACKER</p>

              <h1>Deadlines</h1>

              <p className="deadlines-subtitle">
                Keep every assignment, quiz, test, exam, and study session
                organized.
              </p>
            </div>

            <button
              type="button"
              className="deadlines-add-button"
              onClick={handleAdd}
            >
              + Add Deadline
            </button>
          </header>

          {error && <div className="deadlines-error">{error}</div>}

          {loading ? (
            <div className="deadlines-empty-state">
              <h2>Loading deadlines...</h2>
            </div>
          ) : dateGroups.length === 0 ? (
            <div className="deadlines-empty-state">
              <h2>No upcoming deadlines</h2>

              <p>
                Add your first assignment, quiz, test, exam, or study session.
              </p>

              <button
                type="button"
                onClick={handleAdd}
                className="deadlines-empty-button"
              >
                + Add Deadline
              </button>
            </div>
          ) : (
            <div className="deadline-groups">
              {dateGroups.map(([date, items]) => (
                <section className="deadline-date-group" key={date}>
                  <div className="deadline-date-heading">
                    <h2>{date}</h2>

                    <span>
                      {items.length}{" "}
                      {items.length === 1 ? "deadline" : "deadlines"}
                    </span>
                  </div>

                  <div className="deadline-date-list">
                    {items.map((deadline) => (
                      <DeadlineCard
                        key={deadline._id}
                        deadline={deadline}
                        onEdit={handleEdit}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {showModal && (
            <DeadlineModal
              deadline={selectedDeadline}
              onClose={() => {
                setShowModal(false);
                setSelectedDeadline(null);
              }}
              onSaved={handleSaved}
              onDeleted={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Deadlines;