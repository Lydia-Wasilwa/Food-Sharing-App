// const API_URL = "http://localhost:5000/api";

// const api = {
//   get: async (endpoint) => {
//     const response = await fetch(`${API_URL}${endpoint}`);
//     const data = await response.json();

//     if (!response.ok) throw new Error(data.message || "Network Error");
//     return data;
//   },

//   post: async (endpoint, body) => {
//     const response = await fetch(`${API_URL}${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     if (!response.ok) throw new Error(data.message || "Network Error");
//     return data;
//   },
// };

// export default api;
/**
 * @param {string} endpoint - e.g., '/login' or '/register'
 * @param {object} data - The body data to send
 * @returns {Promise<any>}
 */
export const apiCall = async (endpoint, data) => {
  const baseURL = 'http://localhost:5000/api/auth'; // Adjust if your backend port or route changes

  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check for non-200 status codes (e.g., 401 Unauthorized, 400 Bad Request)
    if (!response.ok) {
      const errorData = await response.json();
      // Throw a new error with the specific message from the backend
      throw new Error(errorData.message || 'Authentication failed');
    }

    return await response.json();
  } catch (error) {
    // Re-throw the error to be caught by the calling component (Login/Register)
    throw error;
  }
};