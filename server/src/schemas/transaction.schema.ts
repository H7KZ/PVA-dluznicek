import joi from 'joi';

export const createTransactionSchema = joi
    .object({
        name: joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than or equal to 50 characters',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
        users: joi
            .array()
            .items(
                joi.object({
                    userId: joi.string().required().messages({
                        'string.empty': 'UserId is required',
                        'any.required': 'UserId is required'
                    }),
                    amount: joi.number().required().messages({
                        'number.base': 'Amount must be a number',
                        'any.required': 'Amount is required'
                    })
                })
            )
            .required()
            .messages({
                'array.base': 'Users must be an array',
                'any.required': 'Users is required'
            })
    })
    .options({ abortEarly: false });

export const updateTransactionSchema = joi
    .object({
        name: joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than or equal to 50 characters',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
        users: joi
            .array()
            .items(
                joi.object({
                    userId: joi.string().required().messages({
                        'string.empty': 'UserId is required',
                        'any.required': 'UserId is required'
                    }),
                    amount: joi.number().required().messages({
                        'number.base': 'Amount must be a number',
                        'any.required': 'Amount is required'
                    })
                })
            )
            .required()
            .messages({
                'array.base': 'Users must be an array',
                'any.required': 'Users is required'
            })
    })
    .options({ abortEarly: false });
