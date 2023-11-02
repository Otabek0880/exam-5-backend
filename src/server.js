import express from "express"
import { newSequelize } from "./config/sequelize.js";
import "dotenv/config.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import cateogryRouter from "./routes/category.routes.js";
import booksRouter from "./routes/book.routes.js";
import AuthorRouter from "./routes/author.routes.js";


try {
    const app = express()
    app.use(cors())
    app.use(express.static("src/uploads"))
    app.use(express.json())
    app.use(userRouter)
    app.use(cateogryRouter)
    app.use(booksRouter)
    app.use(AuthorRouter)
    await newSequelize.authenticate();
    newSequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");

    app.listen(process.env["PORT"], () => {
        console.log(`server is running on port ${process.env["PORT"]}`);
    });
} catch (error) {
    console.error("Unable to connect to the database:", error);
}



