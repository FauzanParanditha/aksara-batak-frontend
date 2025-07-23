"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGuestRedirect = (defaultRedirect = "/admin/dashboard") => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Tentukan path berdasarkan role
  const redirectPath =
    user?.role === "leader"
      ? "/user/dashboard"
      : user?.role === "judge"
      ? "/judge/dashboard"
      : defaultRedirect;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router]);
};
