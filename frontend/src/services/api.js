const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const authApi = {
  register: (data) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
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
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getOne: (token, id) =>
    apiCall(`/courses/${id}`, {
      method: "GET",
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
export default apiCall;