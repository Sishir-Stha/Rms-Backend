import joi from 'joi';

const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;
const VALID_STATUSES = ['Requested', 'Pending', 'Approved', 'Rejected', 'Fulfilled'] as const;

export const createDeviceRequestSchema = joi.object({
  requested_by: joi.number().integer().required(),
  department_id: joi.number().integer().required(),
  device_type: joi.string().required(),
  brand: joi.string().allow(null, '').default(''),
  reason: joi.string().required(),
  quantity: joi.number().integer().min(1).default(1),
  priority: joi.string().valid(...VALID_PRIORITIES).default('Medium'),
  requested_for: joi.string().allow(null, '').default(''),
});

export const filterDeviceRequestsSchema = joi.object({
  approval_status: joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
  device_type: joi.string().allow(null, '').default(''),
});

export const deviceRequestByIdSchema = joi.object({
  request_id: joi.number().integer().required(),
});

export const updateDeviceRequestSchema = joi.object({
  requested_by: joi.number().integer().allow(null).default(null),
  department_id: joi.number().integer().allow(null).default(null),
  device_type: joi.string().allow(null, '').default(''),
  brand: joi.string().allow(null, '').default(''),
  reason: joi.string().allow(null, '').default(''),
  quantity: joi.number().integer().min(1).allow(null).default(null),
  priority: joi.string().valid(...VALID_PRIORITIES).allow(null, '').default(''),
  request_date: joi.date().allow(null, '').default(null),
  approval_status: joi.string().valid(...VALID_STATUSES).allow(null, '').default(''),
  approved_by: joi.number().integer().allow(null).default(null),
  approval_date: joi.date().allow(null, '').default(null),
  requested_for: joi.string().allow(null, '').default(''),
  planned_fulfilled_qty: joi.number().integer().min(0).allow(null).default(null),
  updated_by: joi.number().integer().allow(null).default(null),
});

export const moveKanbanColumnSchema = joi.object({
  approval_status: joi.string().valid(...VALID_STATUSES).required(),
});

export const approveDeviceRequestSchema = joi.object({
  approval_status: joi.string().valid('Approved', 'Rejected', 'Fulfilled', 'Pending').required(),
  approved_by: joi.number().integer().required(),
});

export const splitFulfillmentSchema = joi.object({
  fulfilled_quantity: joi.number().integer().min(1).required(),
  performed_by: joi.number().integer().required(),
  notes: joi.string().allow(null, '').default(''),
});

export const deleteDeviceRequestSchema = joi.object({
  deleted_by: joi.number().integer().required(),
});