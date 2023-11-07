import { storedToken } from '$stores/token.store';
import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@dluznicek.js/client';

class AuthRoute {
	public async signUp({
		name,
		email,
		password
	}: {
		name: string;
		email: string;
		password: string;
	}): Promise<{ error?: AxiosError; success?: AxiosResponse }> {
		let err: AxiosError | undefined;
		let success: AxiosResponse | undefined;

		await client.axiosInstance
			.post(`/auth/sign/up`, {
				name,
				email,
				password
			})
			.then((s) => {
				success = s;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, success };
	}

	public async signIn({
		email,
		password
	}: {
		email: string;
		password: string;
	}): Promise<{ error?: AxiosError; success?: AxiosResponse }> {
		let err: AxiosError | undefined;
		let success: AxiosResponse | undefined;

		await client.axiosInstance
			.post(`/auth/sign/in`, {
				email,
				password
			})
			.then((s: AxiosResponse) => {
				storedToken.set(s.data.token);
				success = s;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, success };
	}
}

export const auth = new AuthRoute();
