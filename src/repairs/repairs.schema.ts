import joi from 'joi';

const VALID_PRIORITIES  = ['Low', 'Medium', 'High', 'Critical'] as const;
const VALID_STATUSES    = ['Open', 'InProgress', 'Resolved', 'Closed'] as const;

// Shared options: strip unknown keys and surface all errors at once


// ── POST /repairs ─────────────────────────────────────────────────────────────
export const createRepairSchema = joi.object({
    device_name         : joi.string().required(),
    category_id         : joi.number().integer().required(),
    serial_no           : joi.string().required(),
    department_id       : joi.number().integer().required(),
    issue               : joi.string().required(),
    notes               : joi.string().allow(null, '').default(''),
    reported_by         : joi.number().integer().required(),
    vendor_id           : joi.number().integer().allow(null).default(null),
    priority            : joi.string().valid(...VALID_PRIORITIES).default('Medium'),
    expected_completion : joi.date().allow(null, '').default(null),
});

// ── GET /repairs ──────────────────────────────────────────────────────────────
export const repairsFilterSchema = joi.object({
    status      : joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    device_name : joi.string().allow(null, '').default(''),
});

// ── GET|DELETE /repairs/:repair_id ────────────────────────────────────────────
export const repairByIdSchema = joi.object({
    repair_id: joi.number().integer().required(),
});

// ── PUT /repairs/:repair_id ───────────────────────────────────────────────────
export const updateRepairsSchema = joi.object({
    device_name         : joi.string().allow(null, '').default(''),
    category_id         : joi.number().integer().allow(null).default(null),
    serial_no           : joi.string().allow(null, '').default(''),
    department_id       : joi.number().integer().allow(null).default(null),
    issue               : joi.string().allow(null, '').default(''),
    notes               : joi.string().allow(null, '').default(''),
    status              : joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    reported_by         : joi.number().integer().allow(null).default(null),
    reported_date       : joi.date().allow(null, '').default(null),
    vendor_id           : joi.number().integer().allow(null).default(null),
    priority            : joi.string().valid(...VALID_PRIORITIES).allow(null, '').default(''),
    expected_completion : joi.date().allow(null, '').default(null),
    resolved_date       : joi.date().allow(null, '').default(null),
    cost                : joi.number().allow(null).default(null),
});

// ── PATCH /repairs/:repair_id/move ────────────────────────────────────────────
export const updateKanbanSchema = joi.object({
    status: joi.string().valid(...VALID_STATUSES).required(),
});