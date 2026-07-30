import axios from "axios";
import { toast } from "react-toastify";


// create api end point
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
      if (!error.response) {
    console.error("Network Error");
    return Promise.reject(error);
  }
    const status = error.response.status;

    switch (status) {
      case 400:
        console.error("Bad Request");
        break;

      case 401:
        console.error("Unauthorized");

        localStorage.removeItem("token");

        window.location.href = "/login";
        break;

      case 403:
        toast.error("You don't have permission.");
        break;

      case 404:
        console.error("Not Found");
        break;

      case 500:
        console.error("Internal Server Error");
        break;

      default:
        console.error("Something went wrong");
    }

    return Promise.reject(error);
  }
);

export default api;