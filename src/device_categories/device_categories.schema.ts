import joi from 'joi';



export const createDeviceCategorySchema = joi.object({
    category_name : joi.string().required(),
    description   : joi.string().allow(null, '').default(''),
    device_count  : joi.number().integer().min(0).allow(null).default(0),
});

export const deviceCategoriesFilterSchema = joi.object({
    category_name: joi.string().allow(null, '').default(''),
});

export const deviceCategoryByIdSchema = joi.object({
    category_id: joi.number().integer().required(),
});

export const updateDeviceCategorySchema = joi.object({
    category_name : joi.string().allow(null, '').default(''),
    description   : joi.string().allow(null, '').default(''),
    device_count  : joi.number().integer().min(0).allow(null).default(null),
});
