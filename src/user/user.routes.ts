import { Router } from "express";
import * as user from "../user/user.controller"
import * as userValidator from "../user/user.validator"

export const userRouter = Router();

userRouter.get("/",user.getAllUsers);
userRouter.post("/",userValidator.InsertUserValidator,user.insertUser);
//userRouter.put("/",)
userRouter.delete("/",user.deleteUsers);