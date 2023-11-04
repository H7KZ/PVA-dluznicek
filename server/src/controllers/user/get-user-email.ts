import { type FastifyReply, type FastifyRequest } from 'fastify';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { email } = request.params as { email: string };

    const user = await UserModel.find({ email }).select(['_id', 'name', 'email']);

    if (!user) return await reply.status(404).send({ message: Errors.user_not_found });

    return await reply.code(200).send({ user });
}
