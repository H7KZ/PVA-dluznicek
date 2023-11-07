import * as jose from 'jose';

export default function decodeJWT(token: string):
	| {
			id: string;
			admin: boolean;
	  }
	| undefined {
	try {
		const decoded = jose.decodeJwt(token);

		return decoded as {
			id: string;
			admin: boolean;
		};
	} catch (err) {
		return undefined;
	}
}
