import argon2 from 'argon2';
import { ARGON2_CONFIG } from '../config/argon2.config';

class HashingService {
    public async hash(str: string): Promise<string> {
        try {
            return await argon2.hash(str, ARGON2_CONFIG);
        } catch (err) {
            return '';
        }
    }

    public async verify(str: string, hashed: string): Promise<any> {
        try {
            return await argon2.verify(hashed, str, ARGON2_CONFIG);
        } catch (err) {
            return {
                error: err
            };
        }
    }
}

export const hashingService = new HashingService();
