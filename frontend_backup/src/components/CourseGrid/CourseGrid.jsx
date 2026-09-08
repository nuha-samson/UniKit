import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { courseApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./CourseGrid.css";

const emptyForm = {
  name: "",
  instructor: "",
  code: "",
  credits: "",
  grade: "",
};

const CourseGrid = () => {
  const { token, isAuthenticated } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadCourses = async () => {
    if (!token || !isAuthenticated) {
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await courseApi.getAll(token);

      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [token, isAuthenticated]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingCourse(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (course) => {
    setEditingCourse(course);

    setForm({
      name: course.name || "",
      instructor: course.instructor || "",
      code: course.code || "",
      credits: course.credits ?? "",
      grade: course.grade || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingCourse(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.instructor.trim()) {
      setError("Course name and instructor are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const courseData = {
        name: form.name.trim(),
        instructor: form.instructor.trim(),
        code: form.code.trim(),
        credits: form.credits === "" ? undefined : Number(form.credits),
        grade: form.grade.trim(),
      };

      if (editingCourse) {
        const data = await courseApi.update(
          token,
          editingCourse._id,
          courseData
        );

        setCourses((current) =>
          current.map((course) =>
            course._id === editingCourse._id
              ? data.course
              : course
          )
        );
      } else {
        const data = await courseApi.create(
          token,
          courseData
        );

        setCourses((current) => [
          data.course,
          ...current,
        ]);
      }

      closeForm();
    } catch (err) {
      setError(err.message || "Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await courseApi.delete(token, courseId);

      setCourses((current) =>
        current.filter(
          (course) => course._id !== courseId
        )
      );
    } catch (err) {
      setError(err.message || "Failed to delete course");
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <div className="page-header">
            <div>
              <h1>My Courses</h1>
              <p>
                Manage all your semester subjects.
              </p>
            </div>

            <button
              className="add-course-btn"
              onClick={openAddForm}
            >
              + Add Course
            </button>
          </div>

          {error && (
            <div className="error-message">
              <h3>Something went wrong</h3>
              <p>{error}</p>

              <button
                className="retry-btn"
                onClick={loadCourses}
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <h3>Loading courses...</h3>
              <p>Please wait.</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <h3>No courses yet</h3>
              <p>
                Add your first course to start building
                your semester.
              </p>

              <button
                className="add-course-btn"
                onClick={openAddForm}
              >
                + Add Your First Course
              </button>
            </div>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {showForm && (
            <div className="course-form-overlay">
              <div className="course-form">
                <div className="form-header">
                  <h2>
                    {editingCourse
                      ? "Edit Course"
                      : "Add Course"}
                  </h2>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={closeForm}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <label>
                    Course Name
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Data Structures"
                      required
                    />
                  </label>

                  <label>
                    Instructor
                    <input
                      name="instructor"
                      value={form.instructor}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Ahmed"
                      required
                    />
                  </label>

                  <label>
                    Course Code
                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder="e.g. CS201"
                    />
                  </label>

                  <label>
                    Credits
                    <input
                      name="credits"
                      type="number"
                      min="0"
                      max="30"
                      value={form.credits}
                      onChange={handleChange}
                      placeholder="e.g. 3"
                    />
                  </label>

                  <label>
                    Grade
                    <input
                      name="grade"
                      value={form.grade}
                      onChange={handleChange}
                      placeholder="e.g. A"
                    />
                  </label>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={closeForm}
                      disabled={saving}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-btn"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : editingCourse
                        ? "Save Changes"
                        : "Add Course"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseGrid;