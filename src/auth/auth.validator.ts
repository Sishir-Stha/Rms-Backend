import { validate } from "../utills/validators";
import { Response,Request, NextFunction } from "express";
import { loginSchema } from "./auth.schema";
import { Tlogin } from "../types/user.types";

export const loginValidator = (req: Request, res:Response, next:NextFunction) =>{

    return validate<Tlogin>(req.body,loginSchema)
    .then(() => next())
    .catch((err)=> next (err))
}