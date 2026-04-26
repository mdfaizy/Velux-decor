import axios from "axios";

// ✅ Base URL
// const BASE_URL = "http://localhost:8080/api";
const BASE_URL='http://velux-decor-server.onrender.com/api'

// ✅ Axios instance
const apiConnector = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR (Token attach)
apiConnector.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (Error handling)
apiConnector.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 🔥 Unauthorized (logout case)
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiConnector;