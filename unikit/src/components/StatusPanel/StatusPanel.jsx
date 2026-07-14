import React from 'react'
import './StatusPanel.css'

const StatusPanel = () => {
  return (
    <>
      {/* TABLET SIZE AND BELOW */}
      <div className="right-panel-tablet">
        <div className="right-panel-inner">
          <h3>Quick Stats</h3>
          <div className="stat-item">
            <span>📚 Courses</span>
            <span className="stat-number">5</span>
          </div>
          <div className="stat-item">
            <span>📋 Assignments</span>
            <span className="stat-number">12</span>
          </div>
          <div className="stat-item">
            <span>📝 Exams this week</span>
            <span className="stat-number">2</span>
          </div>
          <div className="progress-block">
            <div className="label">
              <span>Overall Progress</span>
              <span>72%</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div className="quote">“Small progress every day beats last-minute panic.”</div>
        </div>
      </div>

      {/* DESKTOP SIZE */}
      <aside className="right-panel">
        <h3>Quick Stats</h3>
        <div className="stat-item">
          <span>📚 Courses</span>
          <span className="stat-number">5</span>
        </div>
        <div className="stat-item">
          <span>📋 Assignments</span>
          <span className="stat-number">12</span>
        </div>
        <div className="stat-item">
          <span>📝 Exams this week</span>
          <span className="stat-number">2</span>
        </div>
        <div className="progress-block">
          <div className="label">
            <span>Overall Progress</span>
            <span>72%</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: '72%' }}></div>
          </div>
        </div>
        <div className="quote">“Small progress every day beats last-minute panic.”</div>
      </aside>
    </>
  )
}

export default StatusPanel