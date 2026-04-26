import { Router } from 'express';
import * as deviceCategoryValidators from './device_categories.validator';
import * as deviceCategoryEndpoints from './device_categories.controller';

export const deviceCategoriesRouter = Router();

deviceCategoriesRouter.post('/', deviceCategoryValidators.createDeviceCategoryValidator, deviceCategoryEndpoints.createDeviceCategory);
deviceCategoriesRouter.post('/get', deviceCategoryValidators.deviceCategoriesFilterValidator, deviceCategoryEndpoints.getDeviceCategories);
deviceCategoriesRouter.put('/:category_id', deviceCategoryValidators.updateDeviceCategoryValidator, deviceCategoryEndpoints.updateDeviceCategoryById);
deviceCategoriesRouter.delete('/:category_id', deviceCategoryValidators.deviceCategoryByIdValidator, deviceCategoryEndpoints.deleteDeviceCategory);
