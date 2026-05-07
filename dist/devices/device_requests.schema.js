"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveDeviceRequestSchema = exports.moveKanbanColumnSchema = exports.updateDeviceRequestSchema = exports.deviceRequestByIdSchema = exports.filterDeviceRequestsSchema = exports.createDeviceRequestSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const VALID_STATUSES = ['Requested', 'Pending', 'Approved', 'Rejected'];
exports.createDeviceRequestSchema = joi_1.default.object({
    requested_by: joi_1.default.number().integer().required(),
    department_id: joi_1.default.number().integer().required(),
    device_type: joi_1.default.string().required(),
    brand: joi_1.default.string().allow(null, '').default(''),
    reason: joi_1.default.string().required(),
    quantity: joi_1.default.number().integer().min(1).default(1),
    priority: joi_1.default.string().valid(...VALID_PRIORITIES).default('Medium'),
    requested_for: joi_1.default.string().allow(null, '').default(''),
}).options({ stripUnknown: true });
exports.filterDeviceRequestsSchema = joi_1.default.object({
    approval_status: joi_1.default.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    device_type: joi_1.default.string().allow(null, '').default(''),
});
exports.deviceRequestByIdSchema = joi_1.default.object({
    request_id: joi_1.default.number().integer().required(),
});
exports.updateDeviceRequestSchema = joi_1.default.object({
    requested_by: joi_1.default.number().integer().allow(null).default(null),
    department_id: joi_1.default.number().integer().allow(null).default(null),
    device_type: joi_1.default.string().allow(null, '').default(''),
    brand: joi_1.default.string().allow(null, '').default(''),
    reason: joi_1.default.string().allow(null, '').default(''),
    quantity: joi_1.default.number().integer().min(1).allow(null).default(null),
    priority: joi_1.default.string().valid(...VALID_PRIORITIES).allow(null, '').default(''),
    request_date: joi_1.default.date().allow(null, '').default(null),
    approval_status: joi_1.default.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    approved_by: joi_1.default.number().integer().allow(null).default(null),
    approval_date: joi_1.default.date().allow(null, '').default(null),
});
exports.moveKanbanColumnSchema = joi_1.default.object({
    approval_status: joi_1.default.string().valid(...VALID_STATUSES).required(),
});
exports.approveDeviceRequestSchema = joi_1.default.object({
    approval_status: joi_1.default.string().valid('Approved', 'Rejected').required(),
    approved_by: joi_1.default.number().integer().required(),
});
//# sourceMappingURL=device_requests.schema.js.map