import joi from "joi";

export const insertUserSchema = joi.object({
    user_name : joi.string().required(), 
    email : joi.string().required().email(), 
    password : joi.string().required().min(6), 
    department_id : joi.number().required(), 
    status : joi.string().required(), 
    join_date : joi.date().required()
})

