"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !isAuthenticated ||
      !user ||
      !user.role ||
      !allowedRoles.includes(user.role)
    ) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  return <>{children}</>;
};
