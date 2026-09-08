import React from "react";
import "./CourseGrid.css";

const CourseCard = ({
  course,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>

      <div className="instructor">
        {course.instructor}
      </div>

      <div className="course-meta">
        <span className="assignments-badge">
          {course.credits ?? 0} credits
        </span>

        <span className="exam-date">
          Grade: {course.grade || "Not set"}
        </span>
      </div>

      {course.code && (
        <div className="exam-date">
          Code: {course.code}
        </div>
      )}

      <div className="course-actions">
        <button
          className="card-btn edit-btn"
          onClick={() => onEdit(course)}
        >
          Edit
        </button>

        <button
          className="card-btn delete-btn"
          onClick={() => onDelete(course._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;