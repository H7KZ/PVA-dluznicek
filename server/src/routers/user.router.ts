import { type FastifyInstance } from 'fastify';
import getUserMeController from './../controllers/user/get-me';
import getUserEmailController from './../controllers/user/get-user-email';
import getUserIdController from './../controllers/user/get-user-id';
import tokenMiddleware from './../middlewares/token.middleware';

export default async function userRouter(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'GET',
        url: '/me',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: getUserMeController
    });

    fastify.route({
        method: 'GET',
        url: '/email',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: getUserEmailController
    });

    fastify.route({
        method: 'GET',
        url: '/:userId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: getUserIdController
    });
}
