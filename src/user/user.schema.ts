import joi from "joi";

export const insertUserSchema = joi.object({
    user_name : joi.string().required(), 
    email : joi.string().required().email(), 
    password : joi.string().required().min(6), 
    department_id : joi.number().required(), 
    status : joi.string().required(), 
    join_date : joi.date().required()
})

export const updateUserSchema = joi.object({
    user_id : joi.number().required(),
    user_name : joi.string().required(), 
    email : joi.string().required().email(), 
    department_id : joi.number().required(), 
    status : joi.string().required(), 
  
})

export const userByIdSchema = joi.object({
    user_id: joi.number().integer().required(),
});


