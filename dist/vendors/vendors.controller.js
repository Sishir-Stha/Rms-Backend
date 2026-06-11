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
exports.deleteVendor = exports.updateVendorById = exports.getVendors = exports.createVendor = void 0;
const vendorService = __importStar(require("./vendors.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createVendor = async (req, res) => {
    try {
        const { vendor_name, contact, phone, specialization, rating } = req.body;
        const vendor_id = await vendorService.createVendor(vendor_name, contact ?? null, phone ?? null, specialization ?? null, rating ?? null);
        if (!vendor_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create vendor')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Vendor created successfully')({ vendor_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createVendor = createVendor;
const getVendors = async (req, res) => {
    try {
        const vendor_name = (req.body.vendor_name ?? req.query.vendor_name ?? '');
        const specialization = (req.body.specialization ?? req.query.specialization ?? '');
        const result = await vendorService.getVendors(vendor_name, specialization);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No vendors found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Vendors fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getVendors = getVendors;
const updateVendorById = async (req, res) => {
    try {
        const vendor_id = Number(req.params.vendor_id);
        const existing = await vendorService.getVendorById(vendor_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Vendor not found')({});
        }
        const updateResult = await vendorService.updateVendorById(vendor_id, req.body.vendor_name ?? null, req.body.contact ?? null, req.body.phone ?? null, req.body.specialization ?? null, req.body.rating ?? null);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Vendor updated successfully')({ result: updateResult });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateVendorById = updateVendorById;
const deleteVendor = async (req, res) => {
    try {
        const vendor_id = Number(req.params.vendor_id);
        const existing = await vendorService.getVendorById(vendor_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Vendor not found')({});
        }
        await vendorService.deleteVendor(vendor_id);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Vendor deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteVendor = deleteVendor;
//# sourceMappingURL=vendors.controller.js.map