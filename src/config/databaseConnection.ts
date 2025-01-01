import mongoose from "mongoose";
import { MONGODB } from "./config";

export default async function connectDatabase() {
  try {
    const database = await mongoose.connect(MONGODB.uri, {
      retryWrites: true,
    });
    console.log(`Connected to ${database.connection.name} database`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}
