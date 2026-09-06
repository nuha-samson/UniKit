import { useEffect, useState } from "react";
import { courseApi, deadlineApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./DeadlineModal.css";

const DeadlineModal = ({ deadline, onClose, onSaved, onDeleted }) => {
  const { token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(deadline);

  const [form, setForm] = useState({
    title: "",
    course: "",
    type: "assignment",
    priority: "medium",
    dueDate: "",
    dueTime: "",
    description: "",
  });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await courseApi.getAll(token);
        setCourses(data.courses || []);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    if (token) {
      loadCourses();
    }
  }, [token]);

  useEffect(() => {
    if (!deadline) return;

    const date = new Date(deadline.dueDate);

    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const localTime = date.toTimeString().slice(0, 5);

    setForm({
      title: deadline.title || "",
      course: deadline.course?._id || deadline.course || "",
      type: deadline.type || "assignment",
      priority: deadline.priority || "medium",
      dueDate: localDate,
      dueTime: localTime,
      description: deadline.description || "",
    });
  }, [deadline]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.course) {
      setError("Please select a course.");
      return;
    }

    if (!form.dueDate || !form.dueTime) {
      setError("Please select a due date and time.");
      return;
    }

    const dueDate = new Date(`${form.dueDate}T${form.dueTime}`);

    if (Number.isNaN(dueDate.getTime())) {
      setError("Please enter a valid due date and time.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      course: form.course,
      type: form.type,
      priority: form.priority,
      dueDate: dueDate.toISOString(),
      description: form.description.trim(),
    };

    try {
      setSaving(true);

      if (isEditing) {
        await deadlineApi.update(token, deadline._id, payload);
      } else {
        await deadlineApi.create(token, payload);
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save deadline.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deadline) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this deadline?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deadlineApi.delete(token, deadline._id);

      onDeleted?.(deadline._id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete deadline.");
    } finally {
      setDeleting(false);
    }
  };

  if (!token) return null;

  return (
    <div className="deadline-modal-overlay" onClick={onClose}>
      <div
        className="deadline-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="deadline-modal-header">
          <div>
            <p className="deadline-modal-eyebrow">
              {isEditing ? "EDIT DEADLINE" : "NEW DEADLINE"}
            </p>

            <h2>{isEditing ? "Update Deadline" : "Add Deadline"}</h2>
          </div>

          <button
            type="button"
            className="deadline-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="deadline-form">
          {error && <div className="deadline-form-error">{error}</div>}

          <div className="deadline-form-group">
            <label htmlFor="title">Title *</label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Data Structures Assignment"
              value={form.title}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </div>

          <div className="deadline-form-group">
            <label htmlFor="course">Course *</label>

            {loadingCourses ? (
              <p className="deadline-form-loading">Loading courses...</p>
            ) : (
              <select
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              >
                <option value="">Select a course</option>

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.code
                      ? `${course.code} — ${course.name}`
                      : course.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="deadline-form-row">
            <div className="deadline-form-group">
              <label htmlFor="type">Type *</label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
              </select>
            </div>

            <div className="deadline-form-group">
              <label htmlFor="priority">Priority *</label>

              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="deadline-form-row">
            <div className="deadline-form-group">
              <label htmlFor="dueDate">Due date *</label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="deadline-form-group">
              <label htmlFor="dueTime">Due time *</label>

              <input
                id="dueTime"
                name="dueTime"
                type="time"
                value={form.dueTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="deadline-form-group">
            <label htmlFor="description">
              Description <span>(optional)</span>
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Add any useful details..."
              value={form.description}
              onChange={handleChange}
              maxLength={1000}
              rows={4}
            />
          </div>

          <div className="deadline-modal-actions">
            {isEditing && (
              <button
                type="button"
                className="deadline-delete-button"
                onClick={handleDelete}
                disabled={deleting || saving}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}

            <div className="deadline-modal-actions-right">
              <button
                type="button"
                className="deadline-cancel-button"
                onClick={onClose}
                disabled={saving || deleting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="deadline-save-button"
                disabled={saving || deleting || loadingCourses}
              >
                {saving
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Deadline"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeadlineModal;