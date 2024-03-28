import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/',
    timeout: 2000,
    headers: { }
  });