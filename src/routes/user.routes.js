import { Router } from "express";
import { getuserInfo, login, signUp, updateUserInfo, updateUserPassword } from "../controller/user.controller.js";
import middleware from "../middleware/middleware.js";

const userRouter = Router()

try {
    userRouter.post("/signup",signUp)
    userRouter.post("/login",login)
    userRouter.put("/userinfo",middleware,updateUserInfo)
    userRouter.put("/password",middleware,updateUserPassword)
    userRouter.get("/userinfo",middleware,getuserInfo)
} catch (error) {
    console.log(error.message);
}

export  default userRouter
