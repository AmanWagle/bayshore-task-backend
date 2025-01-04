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
  imageUpload.single("coverPhoto"),
  updateBookDetails
);

router.delete("/:id", authMiddleware, authorizeRole("librarian"), deleteBook);

export default router;
