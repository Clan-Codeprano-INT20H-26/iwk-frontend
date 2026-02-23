import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "@/lib/utils/getCookie";

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
};

const attachAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => requestInterceptor(config),
    (error) => Promise.reject(error)
  );
};

const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({ baseURL: apiUrl });

attachAuthInterceptor(api);
