import { type FastifyReply, type FastifyRequest } from 'fastify';
import ProjectModel from '../../db/models/project.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { projectId } = request.params as { projectId: string };
    const { id } = request.locals;

    const project = await ProjectModel.findById(projectId);

    if (!project) return await reply.status(404).send({ message: Errors.project_not_found });

    if (!project.userIds.includes(id) || project.ownerId !== id)
        return await reply.status(403).send({ message: Errors.permission_denied });

    return await reply.code(200).send({ project });
}
