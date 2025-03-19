import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Đảm bảo đúng URL và cổng của Laravel
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error); // Log lỗi nếu có
    return Promise.reject(error);
  }
);

export default axiosClient;