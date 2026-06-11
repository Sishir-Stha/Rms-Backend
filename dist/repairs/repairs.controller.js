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
exports.deleteRepair = exports.updateKanbanColumn = exports.updateRepairsById = exports.getRepairsById = exports.getRepairs = exports.createRepair = void 0;
const repairService = __importStar(require("./repairs.service"));
const responseFormat_1 = require("../utills/responseFormat");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// ── POST /repairs ─────────────────────────────────────────────────────────────
const createRepair = async (req, res) => {
    try {
        const { device_name, category_id, serial_no, department_id, issue, notes, reported_by, vendor_id, priority, expected_completion, } = req.body;
        const repair_id = await repairService.createRepair(device_name, category_id, serial_no, department_id, issue, notes, reported_by, vendor_id, priority, expected_completion);
        if (!repair_id) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.BAD_REQUEST)(res, 'Failed to create repair')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.CREATED)(res, 'Repair created successfully')({ repair_id });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.createRepair = createRepair;
// ── GET /repairs  (filters via query params) ──────────────────────────────────
const getRepairs = async (req, res) => {
    try {
        // Accept filters from either query-string (?status=Open) or body — body wins if present
        const status = (req.body.status ?? req.query.status ?? '');
        const device_name = (req.body.device_name ?? req.query.device_name ?? '');
        const result = await repairService.getRepairs(status, device_name);
        if (!result || result.length === 0) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'No repairs found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Repairs fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getRepairs = getRepairs;
// ── GET /repairs/:repair_id ───────────────────────────────────────────────────
const getRepairsById = async (req, res) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const result = await repairService.getRepairsById(repair_id);
        if (!result) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Repair not found')({});
        }
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Repair fetched successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.getRepairsById = getRepairsById;
// ── PUT /repairs/:repair_id ───────────────────────────────────────────────────
const updateRepairsById = async (req, res) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Repair not found')({});
        }
        const updateResult = await repairService.updateRepairsById(repair_id, req.body.device_name ?? null, req.body.category_id ?? null, req.body.serial_no ?? null, req.body.department_id ?? null, req.body.issue ?? null, req.body.notes ?? null, req.body.reported_by ?? null, req.body.reported_date ?? null, req.body.vendor_id ?? null, req.body.status ?? null, req.body.priority ?? null, req.body.expected_completion ?? null, req.body.resolved_date ?? null, req.body.cost ?? null);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Repair updated successfully')({ result: updateResult });
    }
    catch (error) {
        console.error(error);
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateRepairsById = updateRepairsById;
// ── PATCH /repairs/:repair_id/move ────────────────────────────────────────────
const updateKanbanColumn = async (req, res) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Repair not found')({});
        }
        const result = await repairService.updateKanbanColumn(repair_id, req.body.status);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Kanban column updated successfully')({ result });
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.updateKanbanColumn = updateKanbanColumn;
// ── DELETE /repairs/:repair_id ────────────────────────────────────────────────
const deleteRepair = async (req, res) => {
    try {
        const repair_id = Number(req.params.repair_id);
        const existing = await repairService.getRepairsById(repair_id);
        if (!existing) {
            return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.NOT_FOUND)(res, 'Repair not found')({});
        }
        await repairService.deleteRepair(repair_id);
        return (0, responseFormat_1.successResponse)(http_status_codes_1.default.OK)(res, 'Repair deleted successfully')({});
    }
    catch (error) {
        return (0, responseFormat_1.errorResponse)(http_status_codes_1.default.INTERNAL_SERVER_ERROR)(res, 'Server Error')({ error });
    }
};
exports.deleteRepair = deleteRepair;
//# sourceMappingURL=repairs.controller.js.map