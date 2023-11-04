import { type FastifyInstance } from 'fastify';
import deleteProjectController from '../controllers/project/delete-project';
import getProjectController from '../controllers/project/get-project';
import patchProjectController from '../controllers/project/patch-project';
import postProjectController from '../controllers/project/post-project';
import tokenMiddleware from '../middlewares/token.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';

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
            await validationMiddleware(req, rep, createProjectSchema, req.body);
        },
        handler: postProjectController
    });

    fastify.route({
        method: 'GET',
        url: '/:projectId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: getProjectController
    });

    fastify.route({
        method: 'PATCH',
        url: '/:projectId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
            await validationMiddleware(req, rep, updateProjectSchema, req.body);
        },
        handler: patchProjectController
    });

    fastify.route({
        method: 'DELETE',
        url: '/:projectId',
        config: {
            rateLimit: {
                max: 500,
                timeWindow: '15 minutes'
            }
        },
        preHandler: async (req, rep) => {
            await tokenMiddleware(req, rep);
        },
        handler: deleteProjectController
    });
}
