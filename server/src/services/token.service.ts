import * as jose from 'jose';
import * as config from './../config/global.config';

class TokenService {
    public async create(
        payload: jose.JWTPayload,
        sign: string,
        alg: string,
        iss: string,
        aud: string,
        sub: string,
        exp: number = Date.now() + 60 * 60 * 1000
    ): Promise<string> {
        try {
            return await new jose.SignJWT(payload)
                .setProtectedHeader({ alg })
                .setIssuer(iss)
                .setAudience(aud)
                .setSubject(sub)
                .setExpirationTime(exp)
                .sign(new TextEncoder().encode(sign));
        } catch (err) {
            return '';
        }
    }

    public async verify(token: string, sign: string, alg: string, sub: string): Promise<any> {
        try {
            const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(sign), {
                algorithms: [alg],
                subject: sub
            });

            return payload;
        } catch (err) {
            return {
                error: err
            };
        }
    }

    public async decode(token: string): Promise<any> {
        try {
            const decoded = jose.decodeJwt(token);

            return decoded;
        } catch (err) {
            return {};
        }
    }

    public async signInToken({ id }: { id: string }, remember: number): Promise<string> {
        return await this.create(
            { id },
            config.JWT_TOKEN_KEY,
            config.JWT_TOKEN_ALG,
            config.JWT_TOKEN_ISSUER,
            config.JWT_TOKEN_AUDIENCE,
            config.JWT_TOKEN_SUBJECT,
            Date.now() + remember
        );
    }

    public async signInTokenVerify(token: string): Promise<any> {
        return await this.verify(token, config.JWT_TOKEN_KEY, config.JWT_TOKEN_ALG, config.JWT_TOKEN_SUBJECT);
    }
}

export const tokenService = new TokenService();
