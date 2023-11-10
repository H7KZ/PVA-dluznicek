import argon2 from 'argon2';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { ARGON2_CONFIG } from '../../config/argon2.config';
import { JWT_TOKEN_TTL } from '../../config/global.config';
import UserModel from './../../db/models/user.model';
import { tokenService } from './../../services/token.service';
import { Errors } from './../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as { email: string; password: string };

    const user = await UserModel.findOne({ email });

    if (!user) return await reply.status(400).send({ message: Errors.wrong_credentials });

    const passwordMatch = await argon2.verify(user.password, password, ARGON2_CONFIG);

    if (!passwordMatch) return await reply.status(400).send({ message: Errors.wrong_credentials });

    const token = await tokenService.signInToken({ id: user._id.toString() }, JWT_TOKEN_TTL);

    if (!token) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.status(200).send({ user: { _id: user._id }, token });
}
