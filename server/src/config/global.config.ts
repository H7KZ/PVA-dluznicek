import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = Number(process.env.PORT);

export const MONGO_URI: string = process.env.MONGO_URI ?? '';

export const JWT_TOKEN_ALG: string = process.env.JWT_TOKEN_ALG ?? '';
export const JWT_TOKEN_SUBJECT: string = process.env.JWT_TOKEN_SUBJECT ?? '';
export const JWT_TOKEN_ISSUER: string = process.env.JWT_TOKEN_ISSUER ?? '';
export const JWT_TOKEN_AUDIENCE: string = process.env.JWT_TOKEN_AUDIENCE ?? '';
export const JWT_TOKEN_KEY: string = process.env.JWT_TOKEN ?? '';
export const JWT_TOKEN_TTL: number = Number(process.env.JWT_TOKEN_TTL);

export const PASSWD_MEM_COST: number = Number(process.env.PASSWD_MEM_COST);
export const PASSWD_TIME_COST: number = Number(process.env.PASSWD_TIME_COST);
export const PASSWD_PARALLELISM: number = Number(process.env.PASSWD_PARALLELISM);
export const PASSWD_SALT: number = Number(process.env.PASSWD_SALT);
