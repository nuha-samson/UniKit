import { useEffect, useState } from "react";
import { courseApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./CourseModal.css";

const CourseModal = ({ course, onClose, onSaved, onDeleted }) => {
  const { token } = useAuth();
  const editing = Boolean(course);

  const [form, setForm] = useState({
    name: "",
    instructor: "",
    code: "",
    credits: "",
    grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!course) return;
    setForm({
      name: course.name || "",
      instructor: course.instructor || "",
      code: course.code || "",
      credits: course.credits === undefined || course.credits === null ? "" : String(course.credits),
      grade: course.grade || "",
    });
  }, [course]);

  const change = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.instructor.trim()) {
      setError("Course name and instructor are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      instructor: form.instructor.trim(),
      code: form.code.trim(),
      credits: form.credits === "" ? undefined : Number(form.credits),
      grade: form.grade.trim(),
    };

    try {
      setLoading(true);
      if (editing) {
        await courseApi.update(token, course._id, payload);
      } else {
        await courseApi.create(token, payload);
      }
      await onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!course) return;
    const confirmed = window.confirm(`Delete "${course.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeleting(true);
      await courseApi.delete(token, course._id);
      await onDeleted(course._id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-kicker">{editing ? "EDIT COURSE" : "NEW COURSE"}</span>
            <h2>{editing ? "Edit Course" : "Add Course"}</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          <label>
            Course name
            <input name="name" value={form.name} onChange={change} placeholder="Data Structures" required />
          </label>

          <label>
            Instructor
            <input name="instructor" value={form.instructor} onChange={change} placeholder="Dr. Ahmed" required />
          </label>

          <div className="form-grid">
            <label>
              Course code
              <input name="code" value={form.code} onChange={change} placeholder="CS201" />
            </label>
            <label>
              Credits
              <input name="credits" type="number" min="0" max="30" value={form.credits} onChange={change} placeholder="3" />
            </label>
          </div>

          <label>
            Grade
            <input name="grade" value={form.grade} onChange={change} placeholder="A" />
          </label>

          <div className="modal-actions">
            {editing && (
              <button type="button" className="button-danger" disabled={deleting || loading} onClick={remove}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="button-secondary" onClick={onClose} disabled={loading || deleting}>
                Cancel
              </button>
              <button type="submit" className="button-primary" disabled={loading || deleting}>
                {loading ? "Saving..." : editing ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;