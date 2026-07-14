import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import CourseGrid from '../components/CourseGrid/CourseGrid'
import DeadlineSection from '../components/DeadlineSection/DeadlineSection'
import StatusPanel from '../components/StatusPanel/StatusPanel'
import Calendar from '../components/Calendar/Calendar' 
import Settings from './Settings'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="dashboard-grid">  
        <Sidebar />
        <CourseGrid />
      </div>
      <DeadlineSection />
      <section className="calendar-section">
            <h2 className="calendar-section-title">📅 Academic Calendar</h2>
            <Calendar />
          
        </section>
      <StatusPanel />
      <Settings />
    </div>
  )
}
export default Dashboard