import axios from "axios";
import { API_URL } from "../constants/apiRoutes";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔑 send cookies automatically
});

export default api;
