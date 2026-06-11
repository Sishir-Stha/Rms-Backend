"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceStockSchema = exports.transferDeviceStockSchema = exports.updateDeviceStockStatusSchema = exports.updateDeviceStockSchema = exports.deviceStockByIdSchema = exports.filterDeviceStocksSchema = exports.createDeviceStockSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const VALID_STOCK_STATUSES = ['IN', 'OUT'];
exports.createDeviceStockSchema = joi_1.default.object({
    device_category_id: joi_1.default.number().integer().required(),
    device_code: joi_1.default.string().max(100).allow(null, '').default(''),
    issue: joi_1.default.string().allow(null, '').default(''),
    date: joi_1.default.date().allow(null, '').default(null),
    origin_sector: joi_1.default.string().max(100).allow(null, '').default(''),
    origin_department: joi_1.default.number().integer().required(),
    destination_sector: joi_1.default.string().max(100).allow(null, '').default(''),
    destination_department: joi_1.default.number().integer().allow(null).default(null),
    device_quantity: joi_1.default.number().integer().min(1).default(1),
    status: joi_1.default.string().valid(...VALID_STOCK_STATUSES).default('IN'),
    created_by: joi_1.default.number().integer().required(),
});
exports.filterDeviceStocksSchema = joi_1.default.object({
    status: joi_1.default.string().valid(...VALID_STOCK_STATUSES).allow(null, '').default(''),
    device_category_id: joi_1.default.number().integer().allow(null, '').default(null),
    origin_department: joi_1.default.number().integer().allow(null, '').default(null),
    destination_department: joi_1.default.number().integer().allow(null, '').default(null),
});
exports.deviceStockByIdSchema = joi_1.default.object({
    stock_id: joi_1.default.number().integer().required(),
});
exports.updateDeviceStockSchema = joi_1.default.object({
    device_category_id: joi_1.default.number().integer().allow(null).default(null),
    device_code: joi_1.default.string().max(100).allow(null, '').default(''),
    issue: joi_1.default.string().allow(null, '').default(''),
    date: joi_1.default.date().allow(null, '').default(null),
    origin_sector: joi_1.default.string().max(100).allow(null, '').default(''),
    origin_department: joi_1.default.number().integer().allow(null).default(null),
    destination_sector: joi_1.default.string().max(100).allow(null, '').default(''),
    destination_department: joi_1.default.number().integer().allow(null).default(null),
    device_quantity: joi_1.default.number().integer().min(1).allow(null).default(null),
    status: joi_1.default.string().valid(...VALID_STOCK_STATUSES).allow(null, '').default(''),
    updated_by: joi_1.default.number().integer().required(),
});
exports.updateDeviceStockStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid(...VALID_STOCK_STATUSES).required(),
    updated_by: joi_1.default.number().integer().required(),
});
exports.transferDeviceStockSchema = joi_1.default.object({
    destination_sector: joi_1.default.string().max(100).allow(null, '').default(''),
    destination_department: joi_1.default.number().integer().required(),
    updated_by: joi_1.default.number().integer().required(),
});
exports.deleteDeviceStockSchema = joi_1.default.object({
    stock_id: joi_1.default.number().integer().required(),
    updated_by: joi_1.default.number().integer().required(),
});
//# sourceMappingURL=device-stock.schema.js.map