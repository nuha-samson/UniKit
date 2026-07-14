import React from 'react'
import CourseCard from './CourseCard'
import './CourseGrid.css'

const CourseGrid = () => {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1>My Courses</h1>
        <p>Manage all your semester subjects.</p>
      </div>
      <CourseCard />
    </main>
  )
}

export default CourseGrid