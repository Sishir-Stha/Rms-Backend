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
exports.deleteDeviceCategory = exports.updateDeviceCategoryById = exports.getDeviceCategories = exports.createDeviceCategory = void 0;
const deviceCategoryService = __importStar(require("./device_categories.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDeviceCategory = async (req, res) => {
    try {
        const { category_name, description, device_count } = req.body;
        const category_id = await deviceCategoryService.createDeviceCategory(category_name, description ?? null, device_count ?? null);
        if (!category_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create device category')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Device category created successfully')({ category_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createDeviceCategory = createDeviceCategory;
const getDeviceCategories = async (req, res) => {
    try {
        const category_name = (req.body.category_name ?? req.query.category_name ?? '');
        const result = await deviceCategoryService.getDeviceCategories(category_name);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No device categories found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device categories fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDeviceCategories = getDeviceCategories;
const updateDeviceCategoryById = async (req, res) => {
    try {
        const category_id = Number(req.params.category_id);
        const existing = await deviceCategoryService.getDeviceCategoryById(category_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device category not found')({});
        }
        const updateResult = await deviceCategoryService.updateDeviceCategoryById(category_id, req.body.category_name ?? null, req.body.description ?? null, req.body.device_count ?? null);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device category updated successfully')({ result: updateResult });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateDeviceCategoryById = updateDeviceCategoryById;
const deleteDeviceCategory = async (req, res) => {
    try {
        const category_id = Number(req.params.category_id);
        const existing = await deviceCategoryService.getDeviceCategoryById(category_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device category not found')({});
        }
        await deviceCategoryService.deleteDeviceCategory(category_id);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device category deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteDeviceCategory = deleteDeviceCategory;
//# sourceMappingURL=device_categories.controller.js.map