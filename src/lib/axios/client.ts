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
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isAdmin = pathname.startsWith("/admin");
  const isLeader = pathname.startsWith("/user");
  const token = getCookie(
    isAdmin
      ? jwtConfig.admin.accessTokenName
      : isLeader
      ? jwtConfig.user.accessTokenName
      : "_jDTkn"
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const isAdmin = pathname.startsWith("/admin");
      const isLeader = pathname.startsWith("/user");
      const status = error?.response?.status;

      if (status === 401) {
        deleteCookie(
          isAdmin
            ? jwtConfig.admin.accessTokenName
            : isLeader
            ? jwtConfig.user.accessTokenName
            : "_jDTkn"
        );
        toast.error(
          isAdmin
            ? "Admin Unauthorized"
            : isLeader
            ? "User Unauthorized"
            : "Judge Unauthorized"
        );
      } else {
        toast.error(error?.response?.data?.message || "Server Error");
      }
    }
    return Promise.reject(error);
  }
);

export default clientAxios;
