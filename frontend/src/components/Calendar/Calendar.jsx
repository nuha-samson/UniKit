import React, { useState } from 'react'
import './Calendar.css'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Handle date selection
  const handleDateClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day)
    setSelectedDate(selected)
    console.log('Selected date:', selected.toLocaleDateString())
  }

  // Check if date is today
  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() &&
           currentMonth === today.getMonth() &&
           currentYear === today.getFullYear()
  }

  // Check if date is selected
  const isSelected = (day) => {
    if (!selectedDate) return false
    return day === selectedDate.getDate() &&
           currentMonth === selectedDate.getMonth() &&
           currentYear === selectedDate.getFullYear()
  }

  // Build calendar grid
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const today = isToday(day)
      const selected = isSelected(day)
      days.push(
        <div
          key={day}
          className={`calendar-day ${today ? 'today' : ''} ${selected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      )
    }

    return days
  }

  // Get events for selected date (sample data)
  const getEventsForDate = () => {
    if (!selectedDate) return []
    
    const sampleEvents = {
      '2024-12-10': ['📚 Final Project Due', '📝 Study Group 3PM'],
      '2024-12-12': ['💻 Programming Exam'],
      '2024-12-15': ['📋 Submit Assignment'],
      '2024-12-18': ['📊 Data Structures Review'],
      '2024-12-22': ['📝 Algorithms Final']
    }
    
    const dateKey = selectedDate.toISOString().split('T')[0]
    return sampleEvents[dateKey] || []
  }

  const events = getEventsForDate()

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth} className="calendar-nav-btn">‹</button>
          <h2>{months[currentMonth]} {currentYear}</h2>
          <button onClick={nextMonth} className="calendar-nav-btn">›</button>
        </div>
        <button onClick={goToToday} className="today-btn">Today</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day names */}
        {dayNames.map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {/* Calendar days */}
        {renderCalendar()}
      </div>

      {/* Events Section */}
      {events.length > 0 && (
        <div className="calendar-events">
          <h3>📌 Events for {selectedDate?.toLocaleDateString()}</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index} className="calendar-event-item">
                {event}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Calendar