// Base URL for your API (change this to your actual backend)
const API_BASE_URL = 'http://localhost:5000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// ---------- COURSE API ----------
export const courseApi = {
  // Get all courses
  getAll: () => apiCall('/courses'),
  
  // Get single course
  getById: (id) => apiCall(`/courses/${id}`),
  
  // Create new course
  create: (data) => apiCall('/courses', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Update course
  update: (id, data) => apiCall(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Delete course
  delete: (id) => apiCall(`/courses/${id}`, {
    method: 'DELETE',
  }),
}

// ---------- ASSIGNMENT API ----------
export const assignmentApi = {
  getAll: () => apiCall('/assignments'),
  getById: (id) => apiCall(`/assignments/${id}`),
  create: (data) => apiCall('/assignments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/assignments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/assignments/${id}`, {
    method: 'DELETE',
  }),
}

// ---------- EXAM API ----------
export const examApi = {
  getAll: () => apiCall('/exams'),
  getById: (id) => apiCall(`/exams/${id}`),
  create: (data) => apiCall('/exams', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/exams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/exams/${id}`, {
    method: 'DELETE',
  }),
}

// ---------- EVENT API ----------
export const eventApi = {
  getByDate: (date) => apiCall(`/events?date=${date}`),
  getAll: () => apiCall('/events'),
  create: (data) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/events/${id}`, {
    method: 'DELETE',
  }),
}

// ---------- USER API ----------
export const userApi = {
  getProfile: () => apiCall('/user/profile'),
  updateProfile: (data) => apiCall('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  updatePassword: (data) => apiCall('/user/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
}

// Export all APIs
export default {
  course: courseApi,
  assignment: assignmentApi,
  exam: examApi,
  event: eventApi,
  user: userApi,
}