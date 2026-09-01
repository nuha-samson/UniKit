import React from 'react'
import './DeadlineSection.css'
const DeadlineCard = () => {
  return (
    <>
             <div className="deadline-grid">
          <div className="deadline-card">
            <span className="deadline-subject">Programming</span>
            <span className="deadline-title">Final project</span>
            <span className="deadline-due">Dec 10</span>
            <span className="status-badge">⚠️ urgent</span>
          </div>
          <div className="deadline-card">
            <span className="deadline-subject">Algorithms</span>
            <span className="deadline-title">Sorting impl.</span>
            <span className="deadline-due">Dec 14</span>
            <span className="status-badge">⏳ due soon</span>
          </div>
          <div className="deadline-card">
            <span className="deadline-subject">Web Dev</span>
            <span className="deadline-title">API integration</span>
            <span className="deadline-due">Dec 18</span>
            <span className="status-badge">📌 pending</span>
          </div>
        </div>
     

    </>
  )
}

export default DeadlineCard
