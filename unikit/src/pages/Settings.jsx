import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import './Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')

  // Sample user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    studentId: 'STU2024001',
    program: 'Computer Science',
    year: '3rd Year',
    notifications: true,
    darkMode: false,
    emailNotifications: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Settings saved:', user)
    alert('✅ Settings saved successfully!')
  }

  return (
    <div className="app">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>⚙️ Settings</h1>
            <p>Manage your account preferences and profile.</p>
          </div>

          <div className="settings-container">
            {/* Settings Tabs */}
            <div className="settings-tabs">
              <button 
                className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Profile
              </button>
              <button 
                className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                ⚡ Preferences
              </button>
              <button 
                className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔒 Security
              </button>
            </div>

            {/* Settings Content */}
            <div className="settings-content">
              <form onSubmit={handleSubmit}>
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="settings-section">
                    <h2>Profile Information</h2>
                    
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="settings-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="settings-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Student ID</label>
                        <input
                          type="text"
                          name="studentId"
                          value={user.studentId}
                          disabled
                          className="settings-input disabled"
                        />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input
                          type="text"
                          name="year"
                          value={user.year}
                          onChange={handleChange}
                          className="settings-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Program</label>
                      <input
                        type="text"
                        name="program"
                        value={user.program}
                        onChange={handleChange}
                        className="settings-input"
                      />
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="settings-section">
                    <h2>Preferences</h2>

                    <div className="settings-toggle">
                      <div className="toggle-info">
                        <span className="toggle-label">Notifications</span>
                        <span className="toggle-description">Receive notifications about deadlines and updates</span>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="notifications"
                          checked={user.notifications}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-toggle">
                      <div className="toggle-info">
                        <span className="toggle-label">Email Notifications</span>
                        <span className="toggle-description">Receive email updates about your courses</span>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={user.emailNotifications}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-toggle">
                      <div className="toggle-info">
                        <span className="toggle-label">Dark Mode</span>
                        <span className="toggle-description">Switch to dark theme (coming soon)</span>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="darkMode"
                          checked={user.darkMode}
                          onChange={handleChange}
                          disabled
                        />
                        <span className="toggle-slider disabled"></span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label>Default Page</label>
                      <select className="settings-select">
                        <option>Dashboard</option>
                        <option>Courses</option>
                        <option>Calendar</option>
                        <option>Assignments</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="settings-section">
                    <h2>Security</h2>

                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="settings-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="settings-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="settings-input"
                      />
                    </div>

                    <div className="settings-divider"></div>

                    <div className="settings-danger">
                      <h3>⚠️ Danger Zone</h3>
                      <p>Once you delete your account, there's no going back. Please be certain.</p>
                      <button type="button" className="danger-btn" onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account? This cannot be undone!')) {
                          console.log('Account deleted')
                        }
                      }}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="settings-actions">
                  <button type="submit" className="save-btn">
                    💾 Save Changes
                  </button>
                  <button type="reset" className="reset-btn">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings