import { type FastifyReply, type FastifyRequest } from 'fastify';
import { tokenService } from './../services/token.service';
import { Errors } from './../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) return await reply.status(401).send({ message: Errors.missing_token, logout: false });

    const verifiedToken = await tokenService.signInTokenVerify(token);

    if (verifiedToken.error) return await reply.status(401).send({ message: Errors.invalid_token, logout: true });

    if (!verifiedToken.id) return await reply.status(401).send({ message: Errors.invalid_token, logout: true });

    request.locals = {
        ...request.locals,
        token: String(token),
        id: String(verifiedToken.id)
    };
}
