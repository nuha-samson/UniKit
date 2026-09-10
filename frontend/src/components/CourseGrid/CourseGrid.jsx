import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import CourseModal from "../CourseModal/CourseModal";
import { courseApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./CourseGrid.css";

const CourseGrid = () => {
  const { token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await courseApi.getAll(token);
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [token]);

  const openAdd = () => {
    setSelectedCourse(null);
    setShowModal(true);
  };

  const openEdit = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const removeFromState = async (id) => {
    setCourses((current) => current.filter((course) => course._id !== id));
  };

  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-main">
          <section className="page-heading">
            <div>
              <span className="eyebrow">ACADEMIC</span>
              <h1>Courses</h1>
              <p>Manage your semester courses, credits, and grades.</p>
            </div>
            <button className="primary-action" onClick={openAdd}>+ Add Course</button>
          </section>

          {error && (
            <div className="page-error">
              {error}
              <button onClick={loadCourses}>Retry</button>
            </div>
          )}

          {loading ? (
            <div className="page-empty"><h2>Loading courses...</h2></div>
          ) : courses.length === 0 ? (
            <div className="page-empty">
              <h2>No courses yet</h2>
              <p>Add your first course to start building your academic dashboard.</p>
              <button className="primary-action" onClick={openAdd}>+ Add Course</button>
            </div>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <article className="course-card" key={course._id}>
                  <div className="course-card-top">
                    <div>
                      <span className="course-code">{course.code || "NO CODE"}</span>
                      <h2>{course.name}</h2>
                      <p>{course.instructor}</p>
                    </div>
                    <span className="credits-badge">{course.credits ?? 0} credits</span>
                  </div>
                  <div className="course-card-footer">
                    <div>
                      <span className="small-label">Grade</span>
                      <strong>{course.grade || "Not set"}</strong>
                    </div>
                    <div className="course-card-actions">
                      <button className="secondary-action" onClick={() => openEdit(course)}>Edit</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <CourseModal
          course={selectedCourse}
          onClose={() => { setShowModal(false); setSelectedCourse(null); }}
          onSaved={loadCourses}
          onDeleted={removeFromState}
        />
      )}
    </div>
  );
};

export default CourseGrid;