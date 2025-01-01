import http from "http";
import express, { Request, Response, NextFunction } from "express";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { SERVER } from "./config/config";
import connectDatabase from "./config/databaseConnection";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  // Initializing API
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  // Connecting to Database
  await connectDatabase();

  // CORS Configuration
  application.use(corsHandler);

  // Route Not Found
  application.use(routeNotFound);

  // Starting Server
  httpServer = http.createServer(application);
  httpServer.listen(SERVER.port, () => {
    console.log(
      `Server is running on http://${SERVER.hostname}:${SERVER.port}`
    );
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

// Start the server
Main();
