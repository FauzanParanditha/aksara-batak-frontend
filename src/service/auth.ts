import clientAxios from "@/lib/axios/client";
import { jwtConfig } from "@/utils/var";
import { deleteCookie, setCookie } from "cookies-next";

export const loginForm = async (email: string, password: string) => {
  const res = await clientAxios.post("/v1/auth/login", { email, password });

  const { token, user } = res.data;

  // Simpan token ke cookie
  setCookie(jwtConfig.admin.accessTokenName, token, {
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
