import axios from 'axios';

const API_URL = 'https://social-media-backend-dwnj.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL, // Set the base URL to the backend
});

export default axiosInstance;
