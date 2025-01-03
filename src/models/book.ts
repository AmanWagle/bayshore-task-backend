import mongoose, { Document, Schema, ObjectId } from "mongoose";

// Book Detail Interface
export interface BookDetails {
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  description: string;
  publisher: string;
  edition: string;
  genre: string;
  language: string;
  quantity: number;
  coverPhoto?: string;
}

export interface Book extends BookDetails, Document {}

//Book Schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  description: { type: String, required: false },
  publisher: { type: String, required: false },
  edition: { type: String, required: false },
  genre: { type: String, required: false },
  language: { type: String, required: false },
  quantity: { type: Number, required: true },
  coverPhoto: { type: String, required: false },
});

// Indexes for search
bookSchema.index({ title: 1 }, { unique: false });
bookSchema.index({ author: 1 }, { unique: false });
bookSchema.index({ isbn: 1 }, { unique: true });
bookSchema.index({ publisher: 1 }, { unique: false });
bookSchema.index({ genre: 1 }, { unique: false });
bookSchema.index({ language: 1 }, { unique: false });

export const Book = mongoose.model<Book>("Book", bookSchema);
