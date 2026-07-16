import React from 'react'
import './CourseGrid.css'

const CourseCard = ({ 
  id, 
  title, 
  instructor, 
  assignments = 0, 
  examDate, 
  progress = 0 
}) => {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <div className="instructor">{instructor}</div>
      <div className="course-meta">
        <span className="assignments-badge">{assignments} assignments</span>
        <span className="exam-date">📅 {examDate || 'TBD'}</span>
      </div>
      <div className="progress-wrap">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <button className="card-btn">Open Course →</button>
    </div>
  )
}

export default CourseCard