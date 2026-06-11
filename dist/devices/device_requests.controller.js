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
exports.deleteDeviceRequest = exports.approveDeviceRequest = exports.moveKanbanColumn = exports.updateDeviceRequestById = exports.getDeviceRequestById = exports.getDeviceRequests = exports.createDeviceRequest = void 0;
const deviceRequestService = __importStar(require("./device_requests.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDeviceRequest = async (req, res) => {
    try {
        const { requested_by, department_id, device_type, brand, reason, quantity, priority, requested_for } = req.body;
        const request_id = await deviceRequestService.createDeviceRequest(requested_by, department_id, device_type, brand, reason, quantity, priority, requested_for);
        if (!request_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create device request')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Device request created successfully')({ request_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createDeviceRequest = createDeviceRequest;
const getDeviceRequests = async (req, res) => {
    try {
        const approval_status = (req.body.approval_status ?? req.query.approval_status ?? '');
        const device_type = (req.body.device_type ?? req.query.device_type ?? '');
        const result = await deviceRequestService.getDeviceRequests(approval_status, device_type);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No device requests found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device requests fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDeviceRequests = getDeviceRequests;
const getDeviceRequestById = async (req, res) => {
    try {
        const request_id = Number(req.params.request_id);
        const result = await deviceRequestService.getDeviceRequestById(request_id);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device request not found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device request fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getDeviceRequestById = getDeviceRequestById;
const updateDeviceRequestById = async (req, res) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device request not found')({});
        }
        const updateResult = await deviceRequestService.updateDeviceRequestById(request_id, req.body.requested_by ?? null, req.body.department_id ?? null, req.body.device_type ?? null, req.body.brand ?? null, req.body.reason ?? null, req.body.quantity ?? null, req.body.priority ?? null, req.body.request_date ?? null, req.body.approval_status ?? null, req.body.approved_by ?? null, req.body.approval_date ?? null, req.body.requested_for ?? null);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device request updated successfully')({ result: updateResult });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateDeviceRequestById = updateDeviceRequestById;
const moveKanbanColumn = async (req, res) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device request not found')({});
        }
        const result = await deviceRequestService.moveKanbanColumn(request_id, req.body.approval_status);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Kanban column updated successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.moveKanbanColumn = moveKanbanColumn;
const approveDeviceRequest = async (req, res) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device request not found')({});
        }
        const result = await deviceRequestService.approveDeviceRequest(request_id, req.body.approval_status, req.body.approved_by);
        const action = req.body.approval_status.toLowerCase();
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, `Device request ${action} successfully`)({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.approveDeviceRequest = approveDeviceRequest;
const deleteDeviceRequest = async (req, res) => {
    try {
        const request_id = Number(req.params.request_id);
        const existing = await deviceRequestService.getDeviceRequestById(request_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Device request not found')({});
        }
        await deviceRequestService.deleteDeviceRequest(request_id);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Device request deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteDeviceRequest = deleteDeviceRequest;
//# sourceMappingURL=device_requests.controller.js.map