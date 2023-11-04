import { type FastifyReply, type FastifyRequest } from 'fastify';
import UserModel from './../../db/models/user.model';
import { Errors } from './../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.locals;

    const user = await UserModel.findById(id).select('-password');

    if (!user) return await reply.status(404).send({ message: Errors.me_not_found });

    return await reply.status(200).send({ user });
}
