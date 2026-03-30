import axios from "axios";

// export const API_BASE_URL = "http://localhost:5454";

export const API_BASE_URL = "https://cognicart-backend.onrender.com" || "http://localhost:5454";
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});