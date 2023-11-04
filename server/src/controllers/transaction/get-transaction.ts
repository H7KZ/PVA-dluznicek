import { type FastifyReply, type FastifyRequest } from 'fastify';
import TransactionModel from '../../db/models/transaction.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { transactionId } = request.params as { transactionId: string };
    const { id } = request.locals;

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) return await reply.status(404).send({ message: Errors.transaction_not_found });

    if (!transaction.users.map(t => t.userId).includes(id) || transaction.ownerId !== id)
        return await reply.status(403).send({ message: Errors.permission_denied });

    return await reply.code(200).send({ transaction });
}
