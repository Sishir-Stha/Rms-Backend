import joi from 'joi';



export const createDepartmentSchema = joi.object({
    department_name : joi.string().required(),
    department_code : joi.string().required(),
    head_count      : joi.number().integer().min(0).allow(null).default(0),
})

export const departmentsFilterSchema = joi.object({
    department_name : joi.string().allow(null, '').default(''),
    department_code : joi.string().allow(null, '').default(''),
})

export const departmentByIdSchema = joi.object({
    department_id: joi.number().integer().required(),
})

export const updateDepartmentSchema = joi.object({
    department_name : joi.string().allow(null, '').default(''),
    department_code : joi.string().allow(null, '').default(''),
    head_count      : joi.number().integer().min(0).allow(null).default(null),
})
