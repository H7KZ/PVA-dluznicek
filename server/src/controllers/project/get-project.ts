import { type FastifyReply, type FastifyRequest } from 'fastify';
import ProjectModel from '../../db/models/project.model';
import TransactionModel from '../../db/models/transaction.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { projectId } = request.params as { projectId: string };
    const { id } = request.locals;

    const project = await ProjectModel.findById(projectId);

    if (!project) return await reply.status(404).send({ message: Errors.project_not_found });

    if (!(project.userIds.map(String).includes(id) || String(project.ownerId) === id))
        return await reply.status(403).send({ message: Errors.permission_denied });

    const accounts: Array<{
        userId: string;
        amount: number;
    }> = [];

    for (const transactionId of project.transactionIds) {
        const transaction = await TransactionModel.findById(transactionId);

        if (!transaction) continue;

        const { ownerId, users } = transaction;

        if (!accounts.find(account => account.userId === String(ownerId))) accounts.push({ userId: id, amount: 0 });

        const ownerAccount = accounts.find(account => account.userId === String(ownerId)) as {
            userId: string;
            amount: number;
        };

        for (const user of users) {
            const userAccount = accounts.find(account => account.userId === String(user.userId));

            ownerAccount.amount += user.amount;

            if (!userAccount) accounts.push({ userId: String(user.userId), amount: -user.amount });
            else userAccount.amount -= user.amount;
        }
    }

    return await reply.code(200).send({ project: { project, accounts } });
}
