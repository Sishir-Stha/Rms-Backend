import { Request, Response, NextFunction } from 'express';
import { validate } from '../utills/validators';
import * as schemas from './device_categories.schema';
import {
    TcreateDeviceCategory,
    TfilterDeviceCategories,
    TupdateDeviceCategory,
} from '../types/device_category.types';

export const createDeviceCategoryValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TcreateDeviceCategory>(req.body, schemas.createDeviceCategorySchema)
        .then(() => next())
        .catch(next);

export const deviceCategoriesFilterValidator = (req: Request, _res: Response, next: NextFunction) => {
    return validate<TfilterDeviceCategories>(req.body, schemas.deviceCategoriesFilterSchema)
        .then(() => next())
        .catch(next);
};

export const deviceCategoryByIdValidator = (req: Request, _res: Response, next: NextFunction) => {
    const params = { category_id: Number(req.params.category_id) };
    return validate<{ category_id: number }>(params, schemas.deviceCategoryByIdSchema)
        .then(() => next())
        .catch(next);
};

export const updateDeviceCategoryValidator = (req: Request, _res: Response, next: NextFunction) =>
    validate<TupdateDeviceCategory>(req.body, schemas.updateDeviceCategorySchema)
        .then(() => next())
        .catch(next);
