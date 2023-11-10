import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@dluznicek.js/client';

export interface Transaction {
	_id: string;
	projectId: string;
	name: string;
	ownerId: string;
	users: Array<{
		userId: string;
		amount: number;
	}>;
}

class TransactionsRoute {
	public async getTransaction(
		transactionId: string
	): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.get(`/transactions/${transactionId}`)
			.then((s: AxiosResponse) => {
				transaction = s.data.transaction as Transaction;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, transaction };
	}

	public async createTransaction(
		projectId: string,
		{
			name,
			users
		}: {
			name: string;
			users: Array<{
				userId: string;
				amount: number;
			}>;
		}
	): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.post(`/transactions/${projectId}`, { name, users })
			.then((s: AxiosResponse) => {
				transaction = s.data.transaction as Transaction;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, transaction };
	}

	public async updateTransaction(
		transactionId: string,
		name: string
	): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.put(`/transactions/${transactionId}`, { name })
			.then((s: AxiosResponse) => {
				transaction = s.data.transaction as Transaction;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, transaction };
	}

	public async deleteTransaction(
		transactionId: string
	): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.delete(`/transactions/${transactionId}`)
			.then((s: AxiosResponse) => {
				transaction = s.data.transaction as Transaction;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, transaction };
	}
}

export const transaction = new TransactionsRoute();
