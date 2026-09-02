import { Response, Request } from "express";
import * as repairService from './reports.service'
import { errorResponse, successResponse } from "../utills/responseFormat";
import HttpStatus from 'http-status-codes'

export const getMonthlyRepairReport = async (req: Request, res: Response) => {
    try {
        const result = await repairService.getMonthlyRepairReport();
        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Monthly Repair Report not found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Monthly Repair Report retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDepartmentRequestReport = async (req: Request, res: Response) => {
    try {
        const result = await repairService.getDepartmentRequestReport();        
        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Department Request Report not found')({});
        }       
        return successResponse(HttpStatus.OK)(res, 'Department Request Report retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }   
};

// --- NEW CONTROLLERS ADDED BELOW ---

export const getMonthlyDeviceSummary = async (req: Request, res: Response) => {
    try {
        const result = await repairService.getMonthlyDeviceSummary();
        return successResponse(HttpStatus.OK)(res, 'Monthly device summary retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceExpenses = async (req: Request, res: Response) => {
    try {
        const { month } = req.query;
        if (!month || typeof month !== 'string') {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Month parameter is required (YYYY-MM)')({});
        }
        const result = await repairService.getDeviceExpenses(month);
        return successResponse(HttpStatus.OK)(res, 'Device expenses retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getMonthlyRepairsSummary = async (req: Request, res: Response) => {
    try {
        const result = await repairService.getMonthlyRepairsSummary();
        return successResponse(HttpStatus.OK)(res, 'Monthly repairs summary retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getRepairCosts = async (req: Request, res: Response) => {
    try {
        const { month } = req.query;
        if (!month || typeof month !== 'string') {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Month parameter is required (YYYY-MM)')({});
        }
        const result = await repairService.getRepairCosts(month);
        return successResponse(HttpStatus.OK)(res, 'Repair costs retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDepartmentRepairsSummary = async (req: Request, res: Response) => {
    try {
        const result = await repairService.getDepartmentRepairsSummary();
        return successResponse(HttpStatus.OK)(res, 'Department repairs summary retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};