import { Request, Response } from "express";
import * as userService from "../user/user.service";
import { errorResponse, successResponse } from "../utills/responseFormat";
import HttpStatus from 'http-status-codes';

export const insertUser = async(req : Request, res : Response)=>{
    try{
        const {user_name, email, password, department_id, status, join_date} = req.body;
        const user = await userService.getUserByEmail(email);

        if(user){
                return errorResponse(HttpStatus.BAD_REQUEST)(res,'Email already exists')({});
        }
        const result = await userService.createUser(user_name, email, password, department_id, status, join_date);
        if(result){
            const response = {
                user_id: result.user_id,
                user_name : result.user_name
            }
            return successResponse(HttpStatus.CREATED)(res,'User created successfully')({response});
        }else {
            return errorResponse(HttpStatus.CONFLICT)(res,'Validation error')({});
        }
    }catch(error){
          return errorResponse(HttpStatus.BAD_REQUEST)(res,'Server Error')({});
    }
}

export const updateUsers = async ( req : Request, res : Response)=>{
    try{
        const {user_id,user_name, email,department_id,status} = req.body;
        const user = await userService.getUserByEmail(email);
        if(!user){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'User Not Found')({});
        }
        const updated = await userService.updateUserById(user_id,user_name,department_id,status,email);
        if(!updated || updated.length === 0){
          return errorResponse(HttpStatus.BAD_REQUEST)(res,'User updating failed')
        }
          return successResponse(HttpStatus.OK)(res,'User updated successfully')({updated})
    }catch(error){
          return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error')({});
    }
}

export const deleteUsers = async ( req : Request , res : Response) =>{
    const{user_id} = req.body;
    try{
        const check = await userService.getUserById(user_id);
        if(!check){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'User Not Found')({});
        }
        const result = await userService.deleteUser(user_id);
         if(!result || result.length === 0){
          return errorResponse(HttpStatus.BAD_REQUEST)(res,'Deleting user failed')
        }
          return successResponse(HttpStatus.OK)(res,'User deleted successfully')({result})

    }catch(error){
          return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error'+ error)({});
    }   
}

export const getAllUsers = async (req : Request,res: Response) => {
    try{
        const result = await userService.getAllUsers();
        if(!result || result.length === 0 ){
            return errorResponse(HttpStatus.NOT_FOUND)(res,"No user found")({});
        }
        return successResponse(HttpStatus.OK)(res,"User List fetched successfully")({result})
    }catch(error){
          return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error')({});
    }

}