import { Router } from "express";
import { addBook, deleteBook, downloadBook, getBookById, getBooks, updateBook } from "../controller/books.controller.js";
import { upload } from "../multer/multer.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import middleware from "../middleware/middleware.js";

const booksRouter = Router()

booksRouter.post("/addbook",adminMiddleware,upload.single("book_pdf"),addBook)
booksRouter.get("/books",middleware, getBooks)
booksRouter.get("/book/:id",middleware,getBookById)
booksRouter.delete("/book/:id",adminMiddleware,deleteBook)
booksRouter.put("/book/:id",adminMiddleware,upload.single("book_pdf"),updateBook)
booksRouter.get("/download/:id",middleware,downloadBook)

export default booksRouter