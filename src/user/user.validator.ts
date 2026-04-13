import { validate } from "../utills/validators";
import { Request,Response, NextFunction } from "express";
import { insertUserSchema, updateUserSchema } from "./user.schema";
import { TinsertUser, TupdateUser } from "../types/user.types";

export const InsertUserValidator = ( req : Request, res: Response,next :NextFunction) =>{

    return validate<TinsertUser>(req.body,insertUserSchema)
    .then(()=> next())
    .catch((err) => next(err))
}

export const UpdateUserValidator = ( req : Request, res : Response, next : NextFunction) =>{

    return validate<TupdateUser>(req.body,updateUserSchema)
    .then(()=> next())
    .catch((err)=> next(err))
}