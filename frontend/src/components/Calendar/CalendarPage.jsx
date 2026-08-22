import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Calendar from './Calendar'
import './CalendarPage.css'

const CalendarPage = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>📅 Calendar</h1>
            <p>Manage your schedule and upcoming events.</p>
          </div>
          <Calendar />
        </main>
      </div>
    </div>
  )
}

export default CalendarPage