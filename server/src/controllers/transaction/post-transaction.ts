import { type FastifyReply, type FastifyRequest } from 'fastify';
import TransactionModel from '../../db/models/transaction.model';
import UserModel from '../../db/models/user.model';
import { Errors } from '../../types/error.types';

export default async function (request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const { id } = request.locals;
    const { name, users } = request.body as {
        name: string;
        users: Array<{
            userId: string;
            amount: number;
        }>;
    };

    for (const userId of users.map(t => t.userId)) {
        const userExists = await UserModel.exists({ _id: userId });

        if (!userExists) return await reply.status(400).send({ message: Errors.permission_denied });
    }

    const transaction = await TransactionModel.create({ name, ownerId: id, users });

    if (!transaction) return await reply.status(500).send({ message: Errors.internal_server_error });

    const user = await UserModel.findById(id);

    if (!user) return await reply.status(500).send({ message: Errors.internal_server_error });

    const updatedUser = await user.updateOne({ $push: { transactionIds: transaction._id } });

    if (!updatedUser) return await reply.status(500).send({ message: Errors.internal_server_error });

    return await reply.code(200).send({ transaction });
}
