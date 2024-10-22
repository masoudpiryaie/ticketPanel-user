import axios from "axios";

// Create a custom Axios instance
const fetchApi = axios.create({
  baseURL: "https://daroomokamel.ir/plugintest/wp-json/", // Replace with your actual API base URL
  timeout: 10000, // Optional: You can set a timeout for the request
});

// Request interceptor to add headers, like Authorization
fetchApi.interceptors.request.use(
  (config) => {
    // Add a token to headers if available (optional)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // You can add more custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
fetchApi.interceptors.response.use(
  (response) => {
    // You can handle the response data here, if necessary
    return response;
  },
  (error) => {
    // You can handle global error messages or specific status codes here
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // For example, log out the user or redirect to login page
        console.log("Unauthorized! Please log in again.");
      }
      // Handle other status codes
    }
    return Promise.reject(error);
  }
);

export default fetchApi;
