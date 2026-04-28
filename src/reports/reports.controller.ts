import { Response, Request } from "express";
import * as repairService from './reports.service'
import { errorResponse,successResponse } from "../utills/responseFormat";
import HttpStatus from 'http-status-codes'

export const getMonthlyRepairReport = async( req: Request, res : Response) => {
    try{
        const result = await repairService.getMonthlyRepairReport();

        if(!result){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'Monthly Repair Report not found')({});
        }
        return successResponse(HttpStatus.OK)(res,'Monthly Repair Report retrieved successfully')(result);

    } catch(error){
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error')({error});
    }
};

export const getDepartmentRequestReport = async( req: Request, res : Response) => {
    try{
        const result = await repairService.getDepartmentRequestReport();        
        if(!result){
            return errorResponse(HttpStatus.NOT_FOUND)(res,'Department Request Report not found')({});
        }       
        return successResponse(HttpStatus.OK)(res,'Department Request Report retrieved successfully')(result);
    } catch(error){
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res,'Server Error')({error});
    }   
};