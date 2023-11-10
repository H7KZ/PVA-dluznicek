import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMiddie from '@fastify/middie';
import fastifyRateLimit from '@fastify/rate-limit';
import * as dotenv from 'dotenv';
import fastify from 'fastify';
import { MONGO_URI, PORT } from './config/global.config';
import { IONTTDatabase } from './db/database';
import authRouter from './routers/auth.router';
import projectRouter from './routers/project.router';
import transactionRouter from './routers/transaction.router';
import userRouter from './routers/user.router';

declare module 'fastify' {
    export interface FastifyRequest {
        locals: Record<string, any>;
    }
}

dotenv.config();

async function startServer(): Promise<void> {
    console.log(`💽 Starting server...`);
    const server = fastify({
        // logger: {
        //     transport: {
        //         target: 'pino-pretty',
        //         options: {
        //             translateTime: 'HH:MM:ss Z',
        //             ignore: 'pid,hostname'
        //         }
        //     }
        // },
        maxParamLength: 600
    });

    await IONTTDatabase.connect(MONGO_URI);
    console.log(`🌐 Connected to database ${PORT}`);

    server.decorate('locals', {});

    await Promise.all([
        server.register(fastifyCompress),
        server.register(fastifyCors, {
            origin: '*'
        }),
        server.register(fastifyHelmet, {
            contentSecurityPolicy: false
        }),
        server.register(fastifyMiddie),
        server.register(fastifyRateLimit, {
            global: false
        })
    ]);

    const routerPrefixes = [
        { router: authRouter, prefix: '/auth' },
        { router: userRouter, prefix: '/users' },
        { router: projectRouter, prefix: '/projects' },
        { router: transactionRouter, prefix: '/transactions' }
    ];

    for (const { router, prefix } of routerPrefixes) {
        await server.register(router, { prefix });
    }

    server.setErrorHandler(error => {
        server.log.error(error);
    });

    server.get('/health', (_, res) => res.status(200).send('OK'));

    await server.listen({ port: PORT });

    console.log(`🚀 Server started on port ${PORT}`);
}

startServer();
