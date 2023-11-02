import { Router } from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import { addAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from "../controller/author.controller.js";
import { upload } from "../multer/multer.js";
import middleware from "../middleware/middleware.js";

const AuthorRouter = Router();

AuthorRouter.post("/createauthor",adminMiddleware,upload.single("author_img"),addAuthor)
AuthorRouter.get("/authors",middleware,getAuthors)
AuthorRouter.put("/updateauthor/:id",adminMiddleware,upload.single("author_img"),updateAuthor)
AuthorRouter.delete("/deleteuser/:id",adminMiddleware,deleteAuthor)
AuthorRouter.get("/author/:id",middleware,getAuthorById)

export default AuthorRouter