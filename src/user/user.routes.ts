import { Router } from "express";
import * as user from "../user/user.controller"
import * as userValidator from "../user/user.validator"

export const userRouter = Router();

userRouter.get("/",user.getAllUsers);
userRouter.get("/:user_id",userValidator.UserByIdValidator,user.getUserById);
userRouter.post("/",userValidator.InsertUserValidator,user.insertUser);
userRouter.put("/",userValidator.UpdateUserValidator,user.updateUsers);
userRouter.delete("/",user.deleteUsers);