import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1>Page Not Found</h1>
          <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-btn primary">Go to Dashboard</Link>
            <Link to="/courses" className="not-found-btn secondary">Browse Courses</Link>
          </div>
          <div className="not-found-suggestions">
            <p> You might be looking for:</p>
            <div className="suggestion-links">
              <Link to="/">Dashboard</Link>
             {/**  <Link to="/calendar">Calendar</Link>
              <Link to="/assignments">Assignments</Link>
              <Link to="/exams">Exams</Link> */} 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound