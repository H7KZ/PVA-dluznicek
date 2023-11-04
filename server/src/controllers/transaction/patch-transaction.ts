import { type FastifyReply, type FastifyRequest } from 'fastify';
import TransactionModel from '../../db/models/transaction.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { transactionId } = request.params as { transactionId: string };
    const { id } = request.locals;
    const { name, userIds } = request.body as { name: string; userIds: string[] };

    for (const userId of userIds) {
        const userExists = await UserModel.exists({ _id: userId });

        if (!userExists) return await reply.status(400).send({ message: Errors.permission_denied });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) return await reply.status(404).send({ message: Errors.transaction_not_found });

    if (!transaction.users.map(t => t.userId).includes(id) || transaction.ownerId !== id)
        return await reply.status(403).send({ message: Errors.permission_denied });

    const updatedTransaction = await transaction.updateOne({ name, userIds });

    if (!updatedTransaction) return await reply.status(500).send({ message: Errors.internal_server_error });

    for (const userId of transaction.users.map(t => t.userId)) {
        const user = await UserModel.findById(userId);

        if (userIds.includes(user?._id)) continue;

        const updatedUser = await user?.updateOne({ $pull: { transactionIds: transaction._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    for (const userId of userIds) {
        const user = await UserModel.findById(userId);

        if (user?.transactionIds.includes(transaction._id)) continue;

        const updatedUser = await user?.updateOne({ $push: { transactionIds: transaction._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    return await reply.code(200).send({ transaction });
}
