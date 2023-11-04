import { type FastifyReply, type FastifyRequest } from 'fastify';
import ProjectModel from '../../db/models/project.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { projectId } = request.params as { projectId: string };
    const { id } = request.locals;
    const { name, userIds } = request.body as { name: string; userIds: string[] };

    for (const userId of userIds) {
        const userExists = await UserModel.exists({ _id: userId });

        if (!userExists) return await reply.status(400).send({ message: Errors.permission_denied });
    }

    const project = await ProjectModel.findById(projectId);

    if (!project) return await reply.status(404).send({ message: Errors.project_not_found });

    if (!project.userIds.includes(id) || project.ownerId !== id)
        return await reply.status(403).send({ message: Errors.permission_denied });

    const updatedProject = await project.updateOne({ name, userIds });

    if (!updatedProject) return await reply.status(500).send({ message: Errors.internal_server_error });

    for (const userId of project.userIds) {
        const user = await UserModel.findById(userId);

        if (userIds.includes(user?._id)) continue;

        const updatedUser = await user?.updateOne({ $pull: { projectIds: project._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    for (const userId of userIds) {
        const user = await UserModel.findById(userId);

        if (user?.projectIds.includes(project._id)) continue;

        const updatedUser = await user?.updateOne({ $push: { projectIds: project._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    return await reply.code(200).send({ project });
}
