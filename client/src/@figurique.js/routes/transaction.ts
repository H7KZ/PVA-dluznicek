import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@figurique.js/client';

interface Transaction {
	_id: string;
	name: string;
	userIds: string[];
	transactionIds: string[];
}

class TransactionsRoute {
	public async getTransaction(
		transactionId: string
	): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.get(`/transaction/${transactionId}`)
			.then((s: AxiosResponse) => {
				transaction = s.data.transaction as Transaction;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, transaction };
	}

	public async createTransaction({
		name,
		users
	}: {
		name: string;
		users: Array<{
			userId: string;
			amount: number;
		}>;
	}): Promise<{ error?: AxiosError; transaction?: Transaction }> {
		let err: AxiosError | undefined;
		let transaction: Transaction | undefined;

		await client.axiosInstance
			.post('/transaction', { name, users })
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
			.put(`/transaction/${transactionId}`, { name })
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
			.delete(`/transaction/${transactionId}`)
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
