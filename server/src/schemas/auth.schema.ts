import joi from 'joi';

export const signUpSchema = joi
    .object({
        name: joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than or equal to 50 characters',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
        email: joi
            .string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email is invalid',
                'any.required': 'Email is required'
            }),
        password: joi.string().min(8).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required'
        })
    })
    .options({ abortEarly: false });

export const signInSchema = joi
    .object({
        email: joi
            .string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email is invalid',
                'any.required': 'Email is required'
            }),
        password: joi.string().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    })
    .options({ abortEarly: false });
