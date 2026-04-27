import { Request, Response } from 'express';
import * as dashboardService from './dashboard.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const getDashboardMetrics = async (_req: Request, res: Response) => {
    try {
        const result = await dashboardService.getDashboardMetrics();

        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Dashboard metrics not found')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Dashboard metrics retrieved successfully')(result);
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
