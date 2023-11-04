import { type FastifyReply, type FastifyRequest } from 'fastify';
import UserModel from './../../db/models/user.model';
import { hashingService } from './../../services/hashing.service';
import { Errors } from './../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = request.body as {
        name: string;
        email: string;
        password: string;
    };

    const existsUser = await UserModel.findOne({ email });

    if (existsUser) return await reply.status(400).send({ message: Errors.email_already_exists });

    const hashedPassword: string = await hashingService.hash(password);

    if (!hashedPassword) return await reply.status(500).send({ message: Errors.internal_server_error });

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    if (!user) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.status(200).send({ user: { _id: user._id } });
}
