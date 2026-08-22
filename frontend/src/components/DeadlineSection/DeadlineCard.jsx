import React from 'react'
import './DeadlineSection.css'
const DeadlineCard = () => {
  return (
    <>
             <div class="deadline-grid">
          <div class="deadline-card">
            <span class="deadline-subject">Programming</span>
            <span class="deadline-title">Final project</span>
            <span class="deadline-due">Dec 10</span>
            <span class="status-badge">⚠️ urgent</span>
          </div>
          <div class="deadline-card">
            <span class="deadline-subject">Algorithms</span>
            <span class="deadline-title">Sorting impl.</span>
            <span class="deadline-due">Dec 14</span>
            <span class="status-badge">⏳ due soon</span>
          </div>
          <div class="deadline-card">
            <span class="deadline-subject">Web Dev</span>
            <span class="deadline-title">API integration</span>
            <span class="deadline-due">Dec 18</span>
            <span class="status-badge">📌 pending</span>
          </div>
        </div>
     

    </>
  )
}

export default DeadlineCard
