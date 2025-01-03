import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface User extends Document {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: "librarian" | "patron";
}

const userSchema = new Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  role: { type: String, required: true, enum: ["librarian", "patron"] },
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<User>("User", userSchema);
