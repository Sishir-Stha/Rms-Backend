"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceStock = exports.transferDeviceStock = exports.updateDeviceStockStatus = exports.updateDeviceStockById = exports.getDeviceStockById = exports.getDeviceStocks = exports.createDeviceStock = void 0;
const deviceStockService = __importStar(require("./device-stock.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDeviceStock = async (req, res) => {
    try {
        const { device_category_id, device_code, issue, date, origin_sector, origin_department, destination_sector, destination_department, device_quantity, status, created_by, } = req.body;
        const stock_id = await deviceStockService.createDeviceStock(device_category_id, device_code, issue, date, origin_sector, origin_department, destination_sector, destination_department, device_quantity, status, created_by);
        if (!stock_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create device stock')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Device stock created successfully')({ stock_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createDeviceStock = createDeviceStock;
const getDeviceStocks = async (req, res) => {
    try {
        const status = (req.body.status ?? req.query.status ?? '');
        const device_category_id = req.body.device_category_id ?? req.query.device_category_id ?? null;
        const origin_department = req.body.origin_department ?? req.query.origin_department ?? null;
        const destination_department = req.body.destination_department ?? req.query.destination_department ?? null;
        const result = await deviceStockService.getDeviceStocks(status || null, device_category_id ? Number(device_category_id) : null, origin_department ? Number(origin_department) : null, destination_department ? Number(destination_department) : null);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No device stock found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDeviceStocks = getDeviceStocks;
const getDeviceStockById = async (req, res) => {
    try {
        const stock_id = Number(req.params.stock_id);
        const result = await deviceStockService.getDeviceStockById(stock_id);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device stock not found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDeviceStockById = getDeviceStockById;
const updateDeviceStockById = async (req, res) => {
    try {
        const stock_id = Number(req.params.stock_id);
        const existing = await deviceStockService.getDeviceStockById(stock_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device stock not found')({});
        }
        const result = await deviceStockService.updateDeviceStockById(stock_id, req.body.device_category_id ?? null, req.body.device_code ?? null, req.body.issue ?? null, req.body.date ?? null, req.body.origin_sector ?? null, req.body.origin_department ?? null, req.body.destination_sector ?? null, req.body.destination_department ?? null, req.body.device_quantity ?? null, req.body.status ?? null, req.body.updated_by);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to update device stock')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock updated successfully')({ result });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateDeviceStockById = updateDeviceStockById;
const updateDeviceStockStatus = async (req, res) => {
    try {
        const stock_id = Number(req.params.stock_id);
        const existing = await deviceStockService.getDeviceStockById(stock_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device stock not found')({});
        }
        const result = await deviceStockService.updateDeviceStockStatus(stock_id, req.body.status, req.body.updated_by);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to update device stock status')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock status updated successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateDeviceStockStatus = updateDeviceStockStatus;
const transferDeviceStock = async (req, res) => {
    try {
        const stock_id = Number(req.params.stock_id);
        const existing = await deviceStockService.getDeviceStockById(stock_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device stock not found')({});
        }
        const result = await deviceStockService.transferDeviceStock(stock_id, req.body.destination_sector, req.body.destination_department, req.body.updated_by);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to transfer device stock')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock transferred successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.transferDeviceStock = transferDeviceStock;
const deleteDeviceStock = async (req, res) => {
    try {
        const stock_id = Number(req.params.stock_id);
        const existing = await deviceStockService.getDeviceStockById(stock_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device stock not found')({});
        }
        const deleted = await deviceStockService.deleteDeviceStock(stock_id, req.body.updated_by);
        if (!deleted) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to delete device stock')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device stock deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteDeviceStock = deleteDeviceStock;
//# sourceMappingURL=device-stock.controller.js.map