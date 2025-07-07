import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyJWT(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "object" && "role" in decoded) {
      return decoded as JwtPayload;
    }
    return null;
  } catch {
    return null;
  }
}
