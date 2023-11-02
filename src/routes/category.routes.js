import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controller/category.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import middleware from "../middleware/middleware.js";
const cateogryRouter = Router()

cateogryRouter.get("/category/:id",middleware , getCategoryById)
cateogryRouter.get("/categories",middleware,getCategories)
cateogryRouter.post("/createCategory",adminMiddleware,addCategory)
cateogryRouter.delete("/deleteCategory/:id",adminMiddleware,deleteCategory)
cateogryRouter.put("/updateCategory/:id",adminMiddleware,updateCategory)
    
export default cateogryRouter