import crypto from 'crypto';
import argon2 from 'argon2';
import { PASSWD_MEM_COST, PASSWD_PARALLELISM, PASSWD_SALT, PASSWD_TIME_COST } from './global.config';

export const ARGON2_CONFIG = {
    type: argon2.argon2id,
    memoryCost: PASSWD_MEM_COST,
    timeCost: PASSWD_TIME_COST,
    parallelism: PASSWD_PARALLELISM,
    salt: crypto.randomBytes(PASSWD_SALT)
};
