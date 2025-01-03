import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

const secretKey = JWT_SECRET;

// Payload for JWT
export interface TokenPayload {
  email: string;
  role: string;
}

// Custom Request Interface extending Request and adding user to the request to store payload
export interface CustomRequestWithTokenPayload extends Request {
  user?: TokenPayload;
}

// Generate JWT using the provided payload
export const generateToken = (payload: TokenPayload) => {
  if (!secretKey) {
    throw new Error("No secret provided");
  }
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

// Verify the JWT is valid or not
export const verifyToken = (token: string) => {
  try {
    if (!secretKey) {
      throw new Error("No secret provided");
    }
    return jwt.verify(token, secretKey) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid JWT Token");
  }
};
