import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Change this to your backend's URL
    timeout: 5000,  // Optional: Set a timeout for requests
});

export default axiosInstance;