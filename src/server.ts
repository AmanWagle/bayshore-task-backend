import http from "http";
import express from "express";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { SERVER } from "./config/config";
import connectDatabase from "./config/databaseConnection";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import path from "path";

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

  // Routes
  application.use("/users", userRoutes);
  application.use("/books", bookRoutes);

  // Serving uploaded image
  application.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
  );

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
