import { Request, Response } from 'express';
import * as deviceStockService from './device-stock.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const createDeviceStock = async (req: Request, res: Response) => {
    try {
        const {
            device_category_id,
            device_code,
            issue,
            date,
            origin_sector,
            origin_department,
            destination_sector,
            destination_department,
            device_quantity,
            status,
            created_by,
        } = req.body;

        const stock_id = await deviceStockService.createDeviceStock(
            device_category_id,
            device_code,
            issue,
            date,
            origin_sector,
            origin_department,
            destination_sector,
            destination_department,
            device_quantity,
            status,
            created_by
        );

        if (!stock_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create device stock')({});
        }

        return successResponse(HttpStatus.CREATED)(res, 'Device stock created successfully')({ stock_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceStocks = async (req: Request, res: Response) => {
    try {
        const status = (req.body.status ?? req.query.status ?? '') as string;

        const device_category_id =
            req.body.device_category_id ?? req.query.device_category_id ?? null;

        const origin_department =
            req.body.origin_department ?? req.query.origin_department ?? null;

        const destination_department =
            req.body.destination_department ?? req.query.destination_department ?? null;

        const result = await deviceStockService.getDeviceStocks(
            status || null,
            device_category_id ? Number(device_category_id) : null,
            origin_department ? Number(origin_department) : null,
            destination_department ? Number(destination_department) : null
        );

        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No device stock found')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceStockById = async (req: Request, res: Response) => {
    try {
        const stock_id = Number(req.params.stock_id);

        const result = await deviceStockService.getDeviceStockById(stock_id);

        if (!result) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device stock not found')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateDeviceStockById = async (req: Request, res: Response) => {
    try {
        const stock_id = Number(req.params.stock_id);

        const existing = await deviceStockService.getDeviceStockById(stock_id);

        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device stock not found')({});
        }

        const result = await deviceStockService.updateDeviceStockById(
            stock_id,
            req.body.device_category_id ?? null,
            req.body.device_code ?? null,
            req.body.issue ?? null,
            req.body.date ?? null,
            req.body.origin_sector ?? null,
            req.body.origin_department ?? null,
            req.body.destination_sector ?? null,
            req.body.destination_department ?? null,
            req.body.device_quantity ?? null,
            req.body.status ?? null,
            req.body.updated_by
        );

        if (!result) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to update device stock')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock updated successfully')({ result });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateDeviceStockStatus = async (req: Request, res: Response) => {
    try {
        const stock_id = Number(req.params.stock_id);

        const existing = await deviceStockService.getDeviceStockById(stock_id);

        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device stock not found')({});
        }

        const result = await deviceStockService.updateDeviceStockStatus(
            stock_id,
            req.body.status,
            req.body.updated_by
        );

        if (!result) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to update device stock status')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock status updated successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const transferDeviceStock = async (req: Request, res: Response) => {
    try {
        const stock_id = Number(req.params.stock_id);

        const existing = await deviceStockService.getDeviceStockById(stock_id);

        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device stock not found')({});
        }

        const result = await deviceStockService.transferDeviceStock(
            stock_id,
            req.body.destination_sector,
            req.body.destination_department,
            req.body.updated_by
        );

        if (!result) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to transfer device stock')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock transferred successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const deleteDeviceStock = async (req: Request, res: Response) => {
    try {
        const stock_id = Number(req.params.stock_id);

        const existing = await deviceStockService.getDeviceStockById(stock_id);

        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device stock not found')({});
        }

        const deleted = await deviceStockService.deleteDeviceStock(
            stock_id,
            req.body.updated_by
        );

        if (!deleted) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to delete device stock')({});
        }

        return successResponse(HttpStatus.OK)(res, 'Device stock deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};