import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7270/api",
  withCredentials: true, // 🔑 send cookies automatically
});

export default api;
