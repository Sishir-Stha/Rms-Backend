import { Request, Response } from "express";
import * as authService from "../user/user.service";
import { errorResponse, successResponse } from "../utills/responseFormat";
import HttpStatus from 'http-status-codes';
import { getDepartmentById } from "../departments/departments.service";


export const loginUser = async(req : Request, res : Response)=>{
    try {
        const {email, password } = req.body;
        const user = await authService.getUserByEmail(email);
        if(!user){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'User doesnt exists')({});
        }
        let pass = password;
        const department = await getDepartmentById(user.department_id);
        const response = {
               user_id : user.user_id,
               username : user.user_name,
               "email": user.email,
               "department" : department?.department_name || 'Error',
               "status" : user.status
        }       
        if(pass === user.password){
            return successResponse(HttpStatus.OK)(res,'Login Sucessfully')({response});
        }else {
            return errorResponse(HttpStatus.BAD_REQUEST)(res,'Incorrect password')({});
        }
    }catch (error) {
        return errorResponse(HttpStatus.UNAUTHORIZED)(res,'Server Error')({});
    }
}