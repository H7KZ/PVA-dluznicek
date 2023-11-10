import { type FastifyReply, type FastifyRequest } from 'fastify';
import ProjectModel from '../../db/models/project.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { projectId } = request.params as { projectId: string };
    const { id } = request.locals;

    const project = await ProjectModel.findById(projectId);

    if (!project) return await reply.status(404).send({ message: Errors.project_not_found });

    if (String(project.ownerId) !== id) return await reply.status(403).send({ message: Errors.permission_denied });

    for (const userId of project.userIds) {
        const user = await UserModel.findById(userId);

        const updatedUser = await user?.updateOne({ $pull: { projectIds: project._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    const user = await UserModel.findById(id);

    const updatedUser = await user?.updateOne({ $pull: { projectIds: project._id } });

    if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });

    const deletedProject = await project.deleteOne();

    if (!deletedProject) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.code(200).send({ project: { _id: project._id } });
}
