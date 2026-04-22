import joi from 'joi';

const JOI_OPTS = { abortEarly: false, stripUnknown: true };

export const createVendorSchema = joi.object({
    vendor_name    : joi.string().required(),
    contact        : joi.string().allow(null, '').default(''),
    phone          : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
    rating         : joi.number().min(0).max(5).allow(null).default(0),
}).options(JOI_OPTS);

export const vendorsFilterSchema = joi.object({
    vendor_name    : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
}).options(JOI_OPTS);

export const vendorByIdSchema = joi.object({
    vendor_id: joi.number().integer().required(),
}).options(JOI_OPTS);

export const updateVendorSchema = joi.object({
    vendor_name    : joi.string().allow(null, '').default(''),
    contact        : joi.string().allow(null, '').default(''),
    phone          : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
    rating         : joi.number().min(0).max(5).allow(null).default(null),
}).options(JOI_OPTS);
