const API_BASE_URL = 'https://unikit-brtm.onrender.com'
//import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiCall = async (endpoint, options = {}) => {
  const headers = {
    ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
};

export const authApi = {
  register: (userData) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  login: (userData) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  getMe: (token) =>
    apiCall("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const courseApi = {
  getAll: (token) =>
    apiCall("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getById: (token, id) =>
    apiCall(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  create: (token, course) =>
    apiCall("/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    }),
  update: (token, id, course) =>
    apiCall(`/courses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    }),
  delete: (token, id) =>
  apiCall(`/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};

export const deadlineApi = {
  getAll: (token) =>
    apiCall("/deadlines", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getById: (token, id) =>
    apiCall(`/deadlines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  create: (token, deadline) =>
    apiCall("/deadlines", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deadline),
    }),
  update: (token, id, updates) =>
    apiCall(`/deadlines/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }),
  delete: (token, id) =>
    apiCall(`/deadlines/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const userApi = {
  getProfile: (token) =>
    apiCall("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (token, data) =>
    apiCall("/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),
};

export { API_BASE_URL };
export default apiCall;