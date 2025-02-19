import axios from "axios";

// Create a custom Axios instance
const fetchApi = axios.create({
  baseURL: "https://daroomokamel.ir/plugintest/wp-json", // Replace with your actual API base URL
  timeout: 10000, // Optional: Timeout in milliseconds
});

// Request interceptor to add the WordPress nonce and token to headers
fetchApi.interceptors.request.use(
  (config) => {
    // Add WordPress nonce from localStorage
    const wpNonce = localStorage.getItem("wpNonce"); // Assume nonce is stored here
    if (wpNonce) {
      config.headers["X-WP-Nonce"] = wpNonce;
    }

    // Optional: Add Bearer token for additional auth, if needed
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
fetchApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized! Please log in again.");
          break;
        case 403:
          console.error("Forbidden! Check your permissions.");
          break;
        case 500:
          console.error("Server error! Try again later.");
          break;
        default:
          console.error("Error:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default fetchApi;
