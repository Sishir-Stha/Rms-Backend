import { validate } from "../utills/validators";
import { Request,Response, NextFunction } from "express";
import { insertUserSchema } from "./user.schema";
import { TinsertUser } from "../types/user.types";

export const InsertUserValidator = ( req : Request, res: Response,next :NextFunction) =>{

    return validate<TinsertUser>(req.body,insertUserSchema)
    .then(()=> next())
    .catch((err) => next(err))
}
