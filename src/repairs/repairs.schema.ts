import joi from "joi";

export const repairsFilterSchema = joi.object({
    status : joi.string().allow(null,"").default(""),
    device_name : joi.string().allow(null,"").default("")
})

export const updateRepairsSchema = joi.object({
    device_name : joi.string().allow(null,"").default(""),
    status :joi.string().allow(null,"").default(""), 
    category_id :joi.number().allow(null,"").default(""),
    serial_no :joi.string().allow(null,"").default(""),
    issue :joi.string().allow(null,"").default(""),
    notes:joi.string().allow(null,"").default(""),
    reported_by :joi.number().allow(null,"").default(""),
    vendor_id:joi.number().allow(null,"").default(""),
    priority:joi.string().allow(null,"").default(""),
    cost:joi.string().allow(null,"").default(""),
})

export const updateKanbanSchema = joi.object({
    status:joi.string().allow(null,"").default(""),
    kanban_column:joi.string().allow(null,"").default("")
})