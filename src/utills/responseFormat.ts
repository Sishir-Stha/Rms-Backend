import { Response } from "express";

export const successResponse = (statusCode : number) => 
    (res : Response , message : string) =>(data : object) => {
    
            return res.status(statusCode).json({
            success : true,
            message : message,
            data : data
            })
    }


export const errorResponse = (statusCode : number) => 
    (res : Response, message: string) => (data : object) => {
        return res.status(statusCode).json({
            success : false,
            message : message,
            data : data
        })
    }
     
