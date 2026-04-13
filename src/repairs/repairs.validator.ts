import { validate } from "../utills/validators";
import { Response,Request, NextFunction } from "express";
import { reportFilterSchema } from "./repairs.schema";
import { TfilterReports } from "../types/repairs.types";

export const repairsFilterValidator = (req : Request,res : Response,  next : NextFunction) =>{

    return validate<TfilterReports>(req.body,reportFilterSchema) 
    .then(()=> next())
    .catch((err) => next(err))
}
