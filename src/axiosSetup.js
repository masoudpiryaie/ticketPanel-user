import axios from "axios";
import { toast } from "react-toastify";

// import axios from "axios";
// Set base URL for all API calls

// Set common headers
axios.defaults.headers.common["Content-Type"] = "application/json";

// Log the window object and check if nvApiSettings exists
console.log("Window Object:", window);
console.log("nvApiSettings in Window:", window?.nvApiSettings);

// Conditionally set the X-WP-Nonce only if it's available
if (typeof window !== "undefined" && window?.nvApiSettings?.nonce) {
  // Set the nonce in the header
  axios.defaults.headers.common["X-WP-Nonce"] = window.nvApiSettings.nonce;
  console.log("X-WP-Nonce set:", window.nvApiSettings.nonce);
} else {
  console.warn("⚠️ WordPress nonce (nvApiSettings.nonce) not available");
}

// Optionally log the Home URL and Site Logo URL
const API_URL = window?.nvApiSettings?.home;
const siteLogo = window?.nvApiSettings?.site_icon_url;
axios.defaults.baseURL = API_URL;

console.log("Home URL:", API_URL);
console.log("Site Logo URL:", siteLogo);

axios.interceptors.response.use(
  (response) => {
    console.log(response, "responce");
    if (response.status === 200) {
      // toast.success("عملیات ب");
      console.log("sdddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        toast.error("خطا ");
      } else if (status === 404) {
        toast.warn("خطای 404");
      }
    }
    return Promise.reject(error);
  }
);
