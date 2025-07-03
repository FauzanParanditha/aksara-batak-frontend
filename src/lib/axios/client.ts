import { jwtConfig } from "@/utils/var";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
  withCredentials: true,
  timeout: 30000,
});

clientAxios.interceptors.request.use((config) => {
  const token = getCookie(jwtConfig.admin.accessTokenName);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/dashboard")) {
        const status = error?.response?.status;
        switch (status) {
          case 401:
            deleteCookie(jwtConfig.admin.accessTokenName);
            toast.error("Unauthorized");
            break;
          default:
            toast.error(error?.response?.data?.message || "Server Error");
        }
      }
    }
    return Promise.reject(error);
  },
);

export default clientAxios;
