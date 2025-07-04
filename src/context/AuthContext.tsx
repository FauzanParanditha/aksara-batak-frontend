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

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const login = (newToken: string) => {
    setCookie(jwtConfig.admin.accessTokenName, newToken, {
      maxAge: 60 * 60 * 24,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    const { user, isExpired } = parseAuthToken(newToken);
    if (!isExpired) {
      setToken(newToken);
      setUser(user);
      setIsAuthenticated(true);

      switch (user?.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "leader":
          router.push("/user/dashboard");
          break;
        default:
          router.push("/"); // fallback
      }
    } else {
      logout(); // Tidak seharusnya terjadi, tapi jaga-jaga
    }
  };

  const logout = useCallback(() => {
    deleteCookie(jwtConfig.admin.accessTokenName);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    const tokenFromCookie = getCookie(jwtConfig.admin.accessTokenName);
    if (typeof tokenFromCookie === "string") {
      const { user, isExpired } = parseAuthToken(tokenFromCookie);
      if (!isExpired) {
        setToken(tokenFromCookie);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        logout();
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
