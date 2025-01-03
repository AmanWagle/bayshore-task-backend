import crypto from "crypto";

// Generate Random Password Salt
export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Hash Password Using Salt
export const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};
