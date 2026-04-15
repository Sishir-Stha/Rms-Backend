import joi from 'joi';

const VALID_PRIORITIES     = ['Low', 'Medium', 'High', 'Critical'] as const;
const VALID_KANBAN_COLUMNS = ['Requested', 'Pending', 'Approved', 'Rejected'] as const;
const VALID_STATUSES       = ['Requested', 'Pending', 'Approved', 'Rejected'] as const;

const JOI_OPTS = { abortEarly: false, stripUnknown: true };

export const createDeviceRequestSchema = joi.object({
    requested_by  : joi.number().integer().required(),
    department_id : joi.number().integer().required(),
    device_type   : joi.string().required(),
    brand         : joi.string().allow(null, '').default(''),
    reason        : joi.string().required(),
    quantity      : joi.number().integer().min(1).default(1),
    priority      : joi.string().valid(...VALID_PRIORITIES).default('Medium'),
}).options(JOI_OPTS);

export const filterDeviceRequestsSchema = joi.object({
    approval_status : joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    device_type     : joi.string().allow(null, '').default(''),
}).options(JOI_OPTS);

export const deviceRequestByIdSchema = joi.object({
    request_id: joi.number().integer().required(),
}).options(JOI_OPTS);

export const updateDeviceRequestSchema = joi.object({
    requested_by    : joi.number().integer().allow(null).default(null),
    department_id   : joi.number().integer().allow(null).default(null),
    device_type     : joi.string().allow(null, '').default(''),
    brand           : joi.string().allow(null, '').default(''),
    reason          : joi.string().allow(null, '').default(''),
    quantity        : joi.number().integer().min(1).allow(null).default(null),
    priority        : joi.string().valid(...VALID_PRIORITIES).allow(null, '').default(''),
    request_date    : joi.date().allow(null, '').default(null),
    approval_status : joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
    approved_by     : joi.number().integer().allow(null).default(null),
    approval_date   : joi.date().allow(null, '').default(null),
    kanban_column   : joi.string().valid(...VALID_KANBAN_COLUMNS).allow(null, '').default(''),
}).options(JOI_OPTS);

export const moveKanbanColumnSchema = joi.object({
    kanban_column: joi.string().valid(...VALID_KANBAN_COLUMNS).required(),
}).options(JOI_OPTS);

export const approveDeviceRequestSchema = joi.object({
    approval_status : joi.string().valid('Approved', 'Rejected').required(),
    approved_by     : joi.number().integer().required(),
}).options(JOI_OPTS);
