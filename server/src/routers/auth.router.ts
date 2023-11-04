import { type FastifyInstance } from 'fastify';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';
import signInController from './../controllers/auth/signin';
import signUpController from './../controllers/auth/signup';
import validationMiddleware from './../middlewares/validation.middleware';

export default async function authRouter(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/sign/up',
        config: {
            rateLimit: {
                max: 5,
                timeWindow: '1 hour'
            }
        },
        preHandler: async (req, rep) => {
            await validationMiddleware(req, rep, signUpSchema, req.body);
        },
        handler: signUpController
    });

    fastify.route({
        method: 'POST',
        url: '/sign/in',
        config: {
            rateLimit: {
                max: 10,
                timeWindow: '1 hour'
            }
        },
        preHandler: async (req, rep) => {
            await validationMiddleware(req, rep, signInSchema, req.body);
        },
        handler: signInController
    });
}
