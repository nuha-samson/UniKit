import './Navbar.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const now = new Date()
  const year = now.getFullYear()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo">Uni<span>Kit</span></div>
        <div className="semester">Fall {year}</div>
      </div>

      <div className="nav-right">
        <span className="nav-user">{user?.name || 'User'}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <div className="avatar">{getInitials()}</div>
      </div>
    </header>
  )
}

export default Navbar