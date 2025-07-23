import clientAxios from "@/lib/axios/client";
import { jwtConfig } from "@/utils/var";
import { deleteCookie, setCookie } from "cookies-next";

export const loginForm = async (email: string, password: string) => {
  const res = await clientAxios.post("/v1/auth/login", { email, password });

  const { token, user } = res.data;

  // Gunakan nama cookie sesuai role
  const accessTokenName =
    user.accessTokenName ?? // Jika disediakan langsung oleh backend
    (user.role === "admin"
      ? jwtConfig.admin.accessTokenName
      : user.role === "leader"
      ? jwtConfig.user?.accessTokenName
      : "_jDTkn");

  setCookie(accessTokenName, token, {
    maxAge: 60 * 60 * 24,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return { user, token };
};

export const logout = () => {
  deleteCookie(jwtConfig.admin.accessTokenName);
  window.location.href = "/auth/login";
};

export const getMe = async () => {
  const res = await clientAxios.get("/v1/auth/me");
  return res.data;
};
