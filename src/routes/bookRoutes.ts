// import express, { Request, Response, NextFunction } from "express";
// import { Book } from "../models/book";
// import { authMiddleware } from "../middleware/authMiddleware";
// import { authorizeRole } from "../middleware/roleMiddleware";
// import { getAllBooks } from "../controllers/bookController";
// import { imageUpload } from "../middleware/imageUpload";

// const router = express.Router();

// interface BookDetails {
//   title: string;
//   author: string;
//   isbn: string;
//   publicationDate: Date;
//   description: string;
//   publisher: string;
//   edition: string;
//   genre: string;
//   language: string;
//   quantity: number;
//   coverPhoto?: string;
// }

// // Add book
// router.post(
//   "/",
//   authMiddleware,
//   authorizeRole("librarian"),
//   imageUpload.single("coverPhoto"),
//   async (
//     req: Request & {
//       body: BookDetails;
//     },
//     res: Response
//   ) => {
//     try {
//       const {
//         title,
//         author,
//         isbn,
//         publicationDate,
//         description,
//         publisher,
//         edition,
//         genre,
//         language,
//         quantity,
//       } = req.body;

//       if (!validateBookDetails(req.body)) {
//         res.status(400).json({ message: "Invalid Book Details" });
//         return;
//       }

//       const coverPhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

//       // check unique isbn

//       const bookDocument = new Book({
//         title,
//         author,
//         isbn,
//         publicationDate,
//         description,
//         publisher,
//         edition,
//         genre,
//         language,
//         quantity,
//         coverPhoto,
//       });

//       await bookDocument.save();
//       res.status(201).send(bookDocument);
//     } catch (error) {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

// // Validate book details
// function validateBookDetails(bookDetails: BookDetails) {
//   const { title, author, isbn, publicationDate, quantity } = bookDetails;

//   if (!title || !author || !isbn || !publicationDate || !quantity) {
//     return false;
//   }

//   return true;
// }

// router.get("/", getAllBooks);

// // Search Books
// router.get("/search", async (req: Request, res: Response) => {
//   try {
//     const { criteria, keyword } = req.query;

//     if (!criteria || !keyword) {
//       res.status(400).json({ message: "Invalid Search Criteria" });
//       return;
//     }

//     const books = await Book.find({
//       [criteria as string]: {
//         $regex: new RegExp(cleanSearchText(keyword as string), "i"),
//       },
//     });
//     res.status(200).send(books);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Clean search text
// function cleanSearchText(text: string) {
//   return text.replace(/[^a-zA-Z0-9 ]/g, "");
// }

// // Get book by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     res.status(200).send(book);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Edit Book Details
// router.put(
//   "/:id",
//   authMiddleware,
//   authorizeRole("librarian"),
//   async (req: Request, res: Response) => {
//     try {
//       const { title, author, publicationDate, quantity } = req.body;

//       if (!validateBookDetails(req.body)) {
//         res.status(400).json({ message: "Invalid Book Details" });
//         return;
//       }

//       const book = await Book.findByIdAndUpdate(
//         req.params.id,
//         {
//           title,
//           author,
//           publicationDate,
//           quantity,
//         },
//         { new: true }
//       );

//       res.status(200).send(book);
//     } catch (error) {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

// // Remove Book
// router.delete(
//   "/:id",
//   authMiddleware,
//   authorizeRole("librarian"),
//   async (req: Request, res: Response) => {
//     try {
//       await Book.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "Book Deleted" });
//     } catch (error) {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

// export default router;

import express from "express";
import {
  addBook,
  listAllBooks,
  searchBooks,
  viewBookDetails,
  updateBookDetails,
  deleteBook,
} from "../controllers/bookController";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";
import { imageUpload } from "../middleware/imageUpload";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRole("librarian"),
  imageUpload.single("coverPhoto"),
  addBook
);

router.get("/", listAllBooks);

router.get("/search", searchBooks);

router.get("/:id", viewBookDetails);

router.put(
  "/:id",
  authMiddleware,
  authorizeRole("librarian"),
  updateBookDetails
);

router.delete("/:id", authMiddleware, authorizeRole("librarian"), deleteBook);

export default router;
