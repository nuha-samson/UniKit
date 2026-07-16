import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import CalendarPage from './components/Calendar/CalendarPage'
import CourseGrid from './components/CourseGrid/CourseGrid'

import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<CourseGrid />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App