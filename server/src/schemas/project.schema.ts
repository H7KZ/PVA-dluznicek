import joi from 'joi';

export const createProjectSchema = joi
    .object({
        name: joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than or equal to 50 characters',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        })
    })
    .options({ abortEarly: false });

export const updateProjectSchema = joi
    .object({
        name: joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than or equal to 50 characters',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
        userIds: joi.array().items(joi.string()).required().messages({
            'array.base': 'UserIds must be an array',
            'any.required': 'UserIds is required'
        })
    })
    .options({ abortEarly: false });
