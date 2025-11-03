import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7009/api",
    withCredentials: true,
});
api.interceptors.request.use(
    (config) => {
        console.log(`API Call: ${config.method?.toUpperCase()} ${config.url}`);
        const token = localStorage.getItem("token");
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token added to request");
        }
        return config;

    },
    (error) => {
        console.error("Error in request:", error);
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        console.log(`API Response:`, response.status);
        return response;

    },
    (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;