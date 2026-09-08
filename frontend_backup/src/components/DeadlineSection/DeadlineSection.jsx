import { useEffect, useState } from "react";
import DeadlineCard from "./DeadlineCard";
import DeadlineModal from "../DeadlineModal/DeadlineModal";
import { deadlineApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./DeadlineSection.css";

const DeadlineSection = () => {
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

  const activeDeadlines = deadlines.filter(
    (deadline) => !deadline.completedAt
  );

  return (
    <section className="deadline-section">
      <div className="deadline-section-header">
        <div>
          <p className="section-eyebrow">ACADEMIC TRACKER</p>
          <h2>Upcoming Deadlines</h2>
        </div>

        <button
          type="button"
          className="add-deadline-button"
          onClick={handleAdd}
        >
          + Add Deadline
        </button>
      </div>

      {error && <div className="deadline-section-error">{error}</div>}

      {loading ? (
        <div className="deadline-empty-state">
          <p>Loading deadlines...</p>
        </div>
      ) : activeDeadlines.length === 0 ? (
        <div className="deadline-empty-state">
          <h3>No upcoming deadlines</h3>
          <p>Add an assignment, quiz, or exam to stay on track.</p>
        </div>
      ) : (
        <div className="deadline-list">
          {activeDeadlines.slice(0, 5).map((deadline) => (
            <DeadlineCard
              key={deadline._id}
              deadline={deadline}
              onEdit={handleEdit}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
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
    </section>
  );
};

export default DeadlineSection;