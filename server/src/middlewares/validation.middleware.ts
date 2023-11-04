import { type FastifyReply, type FastifyRequest } from 'fastify';
import type Joi from 'joi';

export default async function (
    _request: FastifyRequest,
    reply: FastifyReply,
    validationSchema: Joi.ObjectSchema<any>,
    data: any
): Promise<void> {
    const { error } = validationSchema.validate(data);

    if (error) return await reply.status(400).send({ message: error });
}
