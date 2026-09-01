import React from 'react'
import DeadlineCard from './DeadlineCard'
import './DeadlineSection.css'
const DeadlineSection = () => {
  return (
    <>
       <section className="deadlines-section">
        <h2>Upcoming Deadlines</h2>
        <DeadlineCard/>
        </section>
    </>
  )
}

export default DeadlineSection
