import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import DeadlineSection from '../components/DeadlineSection/DeadlineSection'
import StatusPanel from '../components/StatusPanel/StatusPanel'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
         
          
          <DeadlineSection />
          
         
          
          <StatusPanel />
        </main>
      </div>
    </div>
  )
}

export default Dashboard