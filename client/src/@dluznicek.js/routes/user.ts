import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@dluznicek.js/client';

export interface Me {
	_id: string;
	name: string;
	email: string;
	projectIds: string[];
	transactionIds: string[];
}

export interface User {
	_id: string;
	name: string;
	email: string;
}

class UsersRoute {
	public async getMe(): Promise<{ error?: AxiosError; me?: Me }> {
		let err: AxiosError | undefined;
		let me: Me | undefined;

		await client.axiosInstance
			.get('/users/me')
			.then((s: AxiosResponse) => {
				me = s.data.user as Me;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, me };
	}

	public async getUserById(userId: string): Promise<{ error?: AxiosError; user?: User }> {
		let err: AxiosError | undefined;
		let user: User | undefined;

		await client.axiosInstance
			.get(`/users/${userId}`)
			.then((s: AxiosResponse) => {
				user = s.data.user as User;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, user };
	}

	public async getUserByEmail(email: string): Promise<{ error?: AxiosError; user?: User }> {
		let err: AxiosError | undefined;
		let user: User | undefined;

		await client.axiosInstance
			.get(`/users/email`, {
				params: {
					email
				}
			})
			.then((s: AxiosResponse) => {
				user = s.data.user as User;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, user };
	}
}

export const user = new UsersRoute();
