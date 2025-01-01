import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publicationDate: Date;
  quantity: number;
}

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IBook>("Book", bookSchema);
