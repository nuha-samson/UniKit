import './Navbar.css'
import { useState } from "react";

const Navbar = () => {

  const now = new Date();
  const year = now.getFullYear();

  const [course, setCourse] = useState('');

  const courses = [
    "Data Structures",
    "Electric Circuit",
    "Applied Mathematics",
    "Geography"
  ];
  const filteredCourses = courses.filter((item) =>
    item.toLowerCase().includes(course.toLowerCase())
  );
  function notify() {
    console.log("Notification clicked");
  }
  return (
    <header className="navbar">

      <div className="nav-left">
        <div className="logo">
          Uni<span>Kit</span>
        </div>
        <div className="semester">
          Fall {year}
        </div>
      </div>
      {/** 
      <div className="search-wrap">
        <span className="search-icon">
          ⌕
        </span>
        <input type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Search courses, assignments..." />
        {course && (<div className="search-results"> 
          {filteredCourses.map((item, index) => (
              <div key={index}>
                {item}
              </div> ))} </div>)}
      </div>
*/}
      <div className="nav-right">
        <span className="nav-icon" onClick={notify}>🔔</span>
        <div className="avatar">
          NS
        </div>
      </div>

    </header>
  )
}


export default Navbar;