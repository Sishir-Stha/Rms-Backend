"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorSchema = exports.vendorByIdSchema = exports.vendorsFilterSchema = exports.createVendorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createVendorSchema = joi_1.default.object({
    vendor_name: joi_1.default.string().required(),
    contact: joi_1.default.string().allow(null, '').default(''),
    phone: joi_1.default.string().allow(null, '').default(''),
    specialization: joi_1.default.string().allow(null, '').default(''),
    rating: joi_1.default.number().min(0).max(5).allow(null).default(0),
});
exports.vendorsFilterSchema = joi_1.default.object({
    vendor_name: joi_1.default.string().allow(null, '').default(''),
    specialization: joi_1.default.string().allow(null, '').default(''),
});
exports.vendorByIdSchema = joi_1.default.object({
    vendor_id: joi_1.default.number().integer().required(),
});
exports.updateVendorSchema = joi_1.default.object({
    vendor_name: joi_1.default.string().allow(null, '').default(''),
    contact: joi_1.default.string().allow(null, '').default(''),
    phone: joi_1.default.string().allow(null, '').default(''),
    specialization: joi_1.default.string().allow(null, '').default(''),
    rating: joi_1.default.number().min(0).max(5).allow(null).default(null),
});
//# sourceMappingURL=vendors.schema.js.map