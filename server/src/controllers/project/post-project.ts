import { type FastifyReply, type FastifyRequest } from 'fastify';
import ProjectModel from '../../db/models/project.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { id } = request.locals;
    const { name } = request.body as { name: string };

    const project = await ProjectModel.create({ name, ownerId: id });

    if (!project) return await reply.status(500).send({ message: Errors.internal_server_error });

    const user = await UserModel.findById(id);

    if (!user) return await reply.status(500).send({ message: Errors.internal_server_error });

    const updatedUser = await user.updateOne({ $push: { projectIds: project._id } });

    if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.code(200).send({ project });
}
