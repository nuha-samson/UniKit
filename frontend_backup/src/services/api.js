const API_BASE_URL = "http://localhost:5000/api";

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const authApi = {
  register: (userData) =>
    apiCall("/auth/signup", {
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

  create: (token, courseData) =>
    apiCall("/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    }),

  update: (token, id, courseData) =>
    apiCall(`/courses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
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

  create: (token, deadlineData) =>
    apiCall("/deadlines", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deadlineData),
    }),

  update: (token, id, deadlineData) =>
    apiCall(`/deadlines/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deadlineData),
    }),

  delete: (token, id) =>
    apiCall(`/deadlines/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};