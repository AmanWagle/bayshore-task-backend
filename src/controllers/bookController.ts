import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { BookDetails } from "../models/book";

const bookService = new BookService();

// Required Field Validations
const validateBookDetails = (bookDetails: Partial<BookDetails>): boolean => {
  const { title, author, isbn, publicationDate, quantity } = bookDetails;

  if (title == null || title == "") return false;
  if (author == null || author == "") return false;
  if (isbn == null || isbn == "") return false;
  if (!publicationDate) return false;
  if (quantity == null) return false;

  return true;
};

//Add Book controller
export const addBook = async (req: Request, res: Response) => {
  try {
    // Merge the name of uploaded image with the interface
    const bookDetails: BookDetails = {
      ...req.body,
      coverPhoto: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    // Validate required fields
    if (!validateBookDetails(bookDetails)) {
      res.status(400).json({ message: "Please fill out the required fields" });
      return;
    }

    // Check for duplicate ISBN
    const existingBook = await bookService.findBookByISBN(bookDetails.isbn);
    if (existingBook) {
      res.status(400).json({ message: "A book with this ISBN already exists" });
      return;
    }

    // Save book and return response
    const newBook = await bookService.addBook(bookDetails);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// List all available books
export const listAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.listAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search book using criteria and keyword
export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { criteria, keyword } = req.query;

    // Check if criteria and keyword is missing
    if (!criteria || !keyword) {
      res.status(400).json({ message: "Invalid Search Criteria" });
      return;
    }

    // clean the keyword
    const cleanKeyword = cleanSearchText(keyword as string);

    // search and return the list of books
    const books = await bookService.searchBooks(
      criteria as string,
      cleanKeyword
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Clean Search text and keep only alphanumeric and spaces
const cleanSearchText = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9 ]/g, "");
};

// View Book Details
export const viewBookDetails = async (req: Request, res: Response) => {
  try {
    const book = await bookService.viewBookDetails(req.params.id);
    //Check if book exits
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Book Details
export const updateBookDetails = async (req: Request, res: Response) => {
  try {
    // Merge the name of uploaded image with the interface
    const updatedDetails: Partial<BookDetails> = {
      ...req.body,
      ...(req.file ? { coverPhoto: `/uploads/${req.file.filename}` } : {}),
    };

    // Validate the required field
    if (!validateBookDetails(updatedDetails)) {
      res.status(400).json({ message: "Please fill out the required fields" });
      return;
    }

    // Check if there is dublicate ISBN number other then itself
    if (updatedDetails.isbn) {
      const existingBook = await bookService.findBookByISBN(
        updatedDetails.isbn
      );
      if (existingBook && existingBook.id.toString() !== req.params.id) {
        res
          .status(400)
          .json({ message: "A book with this ISBN already exists" });
        return;
      }
    }

    // try to update book
    const book = await bookService.updateBookDetails(
      req.params.id,
      updatedDetails as BookDetails
    );

    // check if book exits or not
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({ message: "Book Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
