import { BookDetails, Book } from "../models/book";

export class BookService {
  // Method: addBook(bookDetails: BookDetails): Promise<Book>
  async addBook(bookDetails: BookDetails): Promise<Book> {
    const book = new Book(bookDetails);
    return book.save();
  }

  // Method: listAllBooks(): Promise<Book[]>
  async listAllBooks(): Promise<Book[]> {
    return Book.find();
  }

  // Method: searchBooks(criteria: string, keyword: string): Promise<Book[]>
  async searchBooks(criteria: string, keyword: string): Promise<Book[]> {
    const searchRegex = new RegExp(keyword.replace(/[^a-zA-Z0-9 ]/g, ""), "i");
    return Book.find({ [criteria]: { $regex: searchRegex } });
  }

  // Method: viewBookDetails(bookId: string): Promise<Book | null>
  async viewBookDetails(bookId: string): Promise<Book | null> {
    return Book.findById(bookId);
  }

  // Method: updateBookDetails(bookId: string, updatedDetails: BookDetails): Promise<Book>
  async updateBookDetails(
    bookId: string,
    updatedDetails: BookDetails
  ): Promise<Book> {
    const book = await Book.findByIdAndUpdate(bookId, updatedDetails, {
      new: true,
    });
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  // Method: removeBook(bookId: string): Promise<void>
  async deleteBook(bookId: string): Promise<void> {
    await Book.findByIdAndDelete(bookId);
  }

  // Find a book by its ISBN
  // Method: findBookByISBN(isbn: string): Promise<Book | null>
  async findBookByISBN(isbn: string): Promise<Book | null> {
    return Book.findOne({ isbn }).exec();
  }
}
