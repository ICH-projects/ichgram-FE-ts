import axios, { type AxiosInstance } from "axios";

const { VITE_API_URL: baseURL } = import.meta.env;

const instance: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export default instance;
