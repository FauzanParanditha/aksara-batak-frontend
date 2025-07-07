"use client";

import { DecodedToken, parseAuthToken } from "@/hooks/useAuthToken";
import { jwtConfig } from "@/utils/var";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export enum UserRole {
  Admin = "admin",
  Leader = "leader",
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const getAccessTokenNameForRole = (role?: string): string => {
  switch (role) {
    case UserRole.Admin:
      return jwtConfig.admin.accessTokenName;
    case UserRole.Leader:
      return jwtConfig.user?.accessTokenName ?? "leader-token";
    default:
      return "token"; // fallback
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const login = (newToken: string) => {
    const { user, isExpired } = parseAuthToken(newToken);
    if (!isExpired && user?.role) {
      const accessTokenName = getAccessTokenNameForRole(user.role);

      setCookie(accessTokenName, newToken, {
        maxAge: 60 * 60 * 24,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      setToken(newToken);
      setUser(user);
      setIsAuthenticated(true);

      switch (user.role) {
        case UserRole.Admin:
          router.push("/admin/dashboard");
          break;
        case UserRole.Leader:
          router.push("/user/dashboard");
          break;
        default:
          router.push("/");
      }
    } else {
      logout(); // token tidak valid
    }
  };

  const logout = useCallback(() => {
    // Hapus semua kemungkinan token
    deleteCookie(jwtConfig.admin.accessTokenName);
    deleteCookie(jwtConfig.user?.accessTokenName ?? "leader-token");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    // Coba baca token dari semua kemungkinan lokasi
    const tryTokens = [
      jwtConfig.admin.accessTokenName,
      jwtConfig.user?.accessTokenName ?? "leader-token",
    ];

    for (const name of tryTokens) {
      const tokenFromCookie = getCookie(name);
      if (typeof tokenFromCookie === "string") {
        const { user, isExpired } = parseAuthToken(tokenFromCookie);
        if (!isExpired) {
          setToken(tokenFromCookie);
          setUser(user);
          setIsAuthenticated(true);
          break; // langsung stop di token pertama yang valid
        }
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
