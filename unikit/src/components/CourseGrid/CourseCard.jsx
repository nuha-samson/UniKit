import React from 'react'
import './CourseGrid.css'

const CourseCard = () => {
  return (
    <div className="course-grid">
      <div className="course-card">
        <h3>Programming</h3>
        <div className="instructor">Dr. Elena V.</div>
        <div className="course-meta">
          <span className="assignments-badge">4 assignments</span>
          <span className="exam-date">📅 Dec 12</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: '68%' }}></div>
        </div>
        <button className="card-btn">Open Course →</button>
      </div>

      <div className="course-card">
        <h3>Data Structures</h3>
        <div className="instructor">Prof. M. Chen</div>
        <div className="course-meta">
          <span className="assignments-badge">3 assignments</span>
          <span className="exam-date">📅 Dec 18</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: '45%' }}></div>
        </div>
        <button className="card-btn">Open Course →</button>
      </div>

      <div className="course-card">
        <h3>Algorithms</h3>
        <div className="instructor">Dr. A. Kumar</div>
        <div className="course-meta">
          <span className="assignments-badge">5 assignments</span>
          <span className="exam-date">📅 Dec 22</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: '30%' }}></div>
        </div>
        <button className="card-btn">Open Course →</button>
      </div>

      <div className="course-card">
        <h3>Database Systems</h3>
        <div className="instructor">Prof. L. Park</div>
        <div className="course-meta">
          <span className="assignments-badge">2 assignments</span>
          <span className="exam-date">📅 Jan 10</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: '80%' }}></div>
        </div>
        <button className="card-btn">Open Course →</button>
      </div>

      <div className="course-card">
        <h3>Web Development</h3>
        <div className="instructor">Dr. S. Rivera</div>
        <div className="course-meta">
          <span className="assignments-badge">6 assignments</span>
          <span className="exam-date">📅 Jan 15</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: '55%' }}></div>
        </div>
        <button className="card-btn">Open Course →</button>
      </div>
    </div>
  )
}

export default CourseCard