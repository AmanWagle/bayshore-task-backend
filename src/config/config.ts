import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3000;

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017";

export const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

export const MONGODB = {
  uri: MONGODB_URI,
};
