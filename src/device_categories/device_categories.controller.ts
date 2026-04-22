import { Request, Response } from 'express';
import * as deviceCategoryService from './device_categories.service';
import { errorResponse, successResponse } from '../utills/responseFormat';
import HttpStatus from 'http-status-codes';

export const createDeviceCategory = async (req: Request, res: Response) => {
    try {
        const { category_name, description, device_count } = req.body;

        const category_id = await deviceCategoryService.createDeviceCategory(
            category_name,
            description ?? null,
            device_count ?? null
        );

        if (!category_id) {
            return errorResponse(HttpStatus.BAD_REQUEST)(res, 'Failed to create device category')({});
        }
        return successResponse(HttpStatus.CREATED)(res, 'Device category created successfully')({ category_id });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const getDeviceCategories = async (req: Request, res: Response) => {
    try {
        const category_name = (req.body.category_name ?? req.query.category_name ?? '') as string;

        const result = await deviceCategoryService.getDeviceCategories(category_name);
        if (!result || result.length === 0) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'No device categories found')({});
        }
        return successResponse(HttpStatus.OK)(res, 'Device categories fetched successfully')({ result });
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const updateDeviceCategoryById = async (req: Request, res: Response) => {
    try {
        const category_id = Number(req.params.category_id);
        const existing    = await deviceCategoryService.getDeviceCategoryById(category_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device category not found')({});
        }

        const updateResult = await deviceCategoryService.updateDeviceCategoryById(
            category_id,
            req.body.category_name ?? null,
            req.body.description ?? null,
            req.body.device_count ?? null
        );
        return successResponse(HttpStatus.OK)(res, 'Device category updated successfully')({ result: updateResult });
    } catch (error) {
        console.error(error);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};

export const deleteDeviceCategory = async (req: Request, res: Response) => {
    try {
        const category_id = Number(req.params.category_id);
        const existing    = await deviceCategoryService.getDeviceCategoryById(category_id);
        if (!existing) {
            return errorResponse(HttpStatus.NOT_FOUND)(res, 'Device category not found')({});
        }
        await deviceCategoryService.deleteDeviceCategory(category_id);
        return successResponse(HttpStatus.OK)(res, 'Device category deleted successfully')({});
    } catch (error) {
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
