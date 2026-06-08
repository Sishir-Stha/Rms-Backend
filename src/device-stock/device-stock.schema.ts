import joi from 'joi';

const VALID_STOCK_STATUSES = ['IN', 'OUT'] as const;

export const createDeviceStockSchema = joi.object({
    device_category_id      : joi.number().integer().required(),
    device_code             : joi.string().max(100).allow(null, '').default(''),
    issue                   : joi.string().allow(null, '').default(''),
    date                    : joi.date().allow(null, '').default(null),
    origin_sector           : joi.string().max(100).allow(null, '').default(''),
    origin_department       : joi.number().integer().required(),
    destination_sector      : joi.string().max(100).allow(null, '').default(''),
    destination_department  : joi.number().integer().allow(null).default(null),
    device_quantity         : joi.number().integer().min(1).default(1),
    status                  : joi.string().valid(...VALID_STOCK_STATUSES).default('IN'),
    created_by              : joi.number().integer().required(),
});

export const filterDeviceStocksSchema = joi.object({
    status                 : joi.string().valid(...VALID_STOCK_STATUSES).allow(null, '').default(''),
    device_category_id     : joi.number().integer().allow(null, '').default(null),
    origin_department      : joi.number().integer().allow(null, '').default(null),
    destination_department : joi.number().integer().allow(null, '').default(null),
});

export const deviceStockByIdSchema = joi.object({
    stock_id: joi.number().integer().required(),
});

export const updateDeviceStockSchema = joi.object({
    device_category_id      : joi.number().integer().allow(null).default(null),
    device_code             : joi.string().max(100).allow(null, '').default(''),
    issue                   : joi.string().allow(null, '').default(''),
    date                    : joi.date().allow(null, '').default(null),
    origin_sector           : joi.string().max(100).allow(null, '').default(''),
    origin_department       : joi.number().integer().allow(null).default(null),
    destination_sector      : joi.string().max(100).allow(null, '').default(''),
    destination_department  : joi.number().integer().allow(null).default(null),
    device_quantity         : joi.number().integer().min(1).allow(null).default(null),
    status                  : joi.string().valid(...VALID_STOCK_STATUSES).allow(null, '').default(''),
    updated_by              : joi.number().integer().required(),
});

export const updateDeviceStockStatusSchema = joi.object({
    status     : joi.string().valid(...VALID_STOCK_STATUSES).required(),
    updated_by : joi.number().integer().required(),
});

export const transferDeviceStockSchema = joi.object({
    destination_sector     : joi.string().max(100).allow(null, '').default(''),
    destination_department : joi.number().integer().required(),
    updated_by             : joi.number().integer().required(),
});

export const deleteDeviceStockSchema = joi.object({
    stock_id    : joi.number().integer().required(),
    updated_by  : joi.number().integer().required(),
});