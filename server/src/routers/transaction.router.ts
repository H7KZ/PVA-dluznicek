import { type FastifyInstance } from 'fastify';
import deleteTransactionController from '../controllers/transaction/delete-transaction';
import getTransactionController from '../controllers/transaction/get-transaction';
import patchTransactionController from '../controllers/transaction/patch-transaction';
import postTransactionController from '../controllers/transaction/post-transaction';
import tokenMiddleware from '../middlewares/token.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transaction.schema';

export default async function userRouter(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
            await validationMiddleware(req, rep, createTransactionSchema, req.body);
        },
        handler: postTransactionController
    });

    fastify.route({
        method: 'GET',
        url: '/:transactionId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: getTransactionController
    });

    fastify.route({
        method: 'PATCH',
        url: '/:transactionId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
            await validationMiddleware(req, rep, updateTransactionSchema, req.body);
        },
        handler: patchTransactionController
    });

    fastify.route({
        method: 'DELETE',
        url: '/:transactionId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: deleteTransactionController
    });
}
