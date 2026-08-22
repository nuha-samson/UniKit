import React from 'react'
import CourseCard from './CourseCard'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import './CourseGrid.css'

const CourseGrid = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>My Courses</h1>
            <p>Manage all your semester subjects.</p>
          </div>
          <CourseCard />
        </main>
      </div>
    </div>
  )
}


export default CourseGrid