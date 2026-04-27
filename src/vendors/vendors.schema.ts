import joi from 'joi';



export const createVendorSchema = joi.object({
    vendor_name    : joi.string().required(),
    contact        : joi.string().allow(null, '').default(''),
    phone          : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
    rating         : joi.number().min(0).max(5).allow(null).default(0),
});

export const vendorsFilterSchema = joi.object({
    vendor_name    : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
});

export const vendorByIdSchema = joi.object({
    vendor_id: joi.number().integer().required(),
});

export const updateVendorSchema = joi.object({
    vendor_name    : joi.string().allow(null, '').default(''),
    contact        : joi.string().allow(null, '').default(''),
    phone          : joi.string().allow(null, '').default(''),
    specialization : joi.string().allow(null, '').default(''),
    rating         : joi.number().min(0).max(5).allow(null).default(null),
});
