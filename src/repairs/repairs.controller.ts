import { Response, Request } from 'express';
import * as repairService from '../repairs/repairs.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const getRepairs = async ( req: Request, res: Response)=>{
    try{
        const {status, device_name} = req.body;
        const result = await repairService.getRepairs(status,device_name);
        if (!result || result.length === 0){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'No reports Found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Repairs fetched successfully')({result})
    }catch(error){
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error')({});
    }
}

