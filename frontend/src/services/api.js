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

export default apiCall;