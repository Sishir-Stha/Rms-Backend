import joi from "joi";

export const reportFilterSchema = joi.object({
    status : joi.string().allow(null,"").default(""),
    device_name : joi.string().allow(null,"").default("")
})