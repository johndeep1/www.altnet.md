// Authentication configuration
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
}
