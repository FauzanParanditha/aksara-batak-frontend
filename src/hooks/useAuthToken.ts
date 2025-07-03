import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  iat?: number;
  sub?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export function parseAuthToken(token: string | null) {
  if (!token) return { user: null, isExpired: true };

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp < now;

    return { user: isExpired ? null : decoded, isExpired };
  } catch (err) {
    console.error(err);
    return { user: null, isExpired: true };
  }
}
