"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKanbanSchema = exports.updateRepairsSchema = exports.repairByIdSchema = exports.repairsFilterSchema = exports.createRepairSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const VALID_STATUSES = ['Open', 'InProgress', 'Resolved', 'Closed'];
// Shared options: strip unknown keys and surface all errors at once
// ── POST /repairs ─────────────────────────────────────────────────────────────
exports.createRepairSchema = joi_1.default.object({
    device_name: joi_1.default.string().required(),
    category_id: joi_1.default.number().integer().required(),
    serial_no: joi_1.default.string().required(),
    department_id: joi_1.default.number().integer().required(),
    issue: joi_1.default.string().required(),
    notes: joi_1.default.string().allow(null, '').default(''),
    reported_by: joi_1.default.number().integer().required(),
    vendor_id: joi_1.default.number().integer().allow(null).default(null),
    priority: joi_1.default.string().valid(...VALID_PRIORITIES).default('Medium'),
    expected_completion: joi_1.default.date().allow(null, '').default(null),
});
// ── GET /repairs ──────────────────────────────────────────────────────────────
exports.repairsFilterSchema = joi_1.default.object({
    status: joi_1.default.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    device_name: joi_1.default.string().allow(null, '').default(''),
});
// ── GET|DELETE /repairs/:repair_id ────────────────────────────────────────────
exports.repairByIdSchema = joi_1.default.object({
    repair_id: joi_1.default.number().integer().required(),
});
// ── PUT /repairs/:repair_id ───────────────────────────────────────────────────
exports.updateRepairsSchema = joi_1.default.object({
    device_name: joi_1.default.string().allow(null, '').default(''),
    category_id: joi_1.default.number().integer().allow(null).default(null),
    serial_no: joi_1.default.string().allow(null, '').default(''),
    department_id: joi_1.default.number().integer().allow(null).default(null),
    issue: joi_1.default.string().allow(null, '').default(''),
    notes: joi_1.default.string().allow(null, '').default(''),
    status: joi_1.default.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    reported_by: joi_1.default.number().integer().allow(null).default(null),
    reported_date: joi_1.default.date().allow(null, '').default(null),
    vendor_id: joi_1.default.number().integer().allow(null).default(null),
    priority: joi_1.default.string().valid(...VALID_PRIORITIES).allow(null, '').default(''),
    expected_completion: joi_1.default.date().allow(null, '').default(null),
    resolved_date: joi_1.default.date().allow(null, '').default(null),
    cost: joi_1.default.number().allow(null).default(null),
});
// ── PATCH /repairs/:repair_id/move ────────────────────────────────────────────
exports.updateKanbanSchema = joi_1.default.object({
    status: joi_1.default.string().valid(...VALID_STATUSES).required(),
});
//# sourceMappingURL=repairs.schema.js.map