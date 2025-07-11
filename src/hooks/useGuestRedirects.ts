"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGuestRedirect = (redirectPath = "/admin/dashboard") => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useAuth().user?.role === "leader" && (redirectPath = "/user/dashboard");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router]);
};
