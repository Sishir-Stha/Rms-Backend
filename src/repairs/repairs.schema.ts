import joi from "joi";

export const reportFilterSchema = joi.object({
    status : joi.string(),
    device_name : joi.string()
})