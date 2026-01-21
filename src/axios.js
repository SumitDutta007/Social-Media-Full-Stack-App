import axios from "axios";

// Use environment variable for production, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8800";

const axiosInstance = axios.create({
  baseURL: API_URL, // Set the base URL to the backend
});

export default axiosInstance;
