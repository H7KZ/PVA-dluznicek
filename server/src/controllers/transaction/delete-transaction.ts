import { type FastifyReply, type FastifyRequest } from 'fastify';
import TransactionModel from '../../db/models/transaction.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { transactionId } = request.params as { transactionId: string };
    const { id } = request.locals;

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) return await reply.status(404).send({ message: Errors.transaction_not_found });

    if (transaction.ownerId !== id) return await reply.status(403).send({ message: Errors.permission_denied });

    for (const u of transaction.users) {
        const user = await UserModel.findById(u.userId);

        const updatedUser = await user?.updateOne({ $pull: { transactionIds: transaction._id } });

        if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });
    }

    const user = await UserModel.findById(id);

    const updatedUser = await user?.updateOne({ $pull: { transactionIds: transaction._id } });

    if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });

    const deletedTransaction = await transaction.deleteOne();

    if (!deletedTransaction) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.code(200).send({ transaction: { _id: transaction._id } });
}
