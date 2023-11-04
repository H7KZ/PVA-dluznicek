import Axios, { type AxiosInstance } from 'axios';
import { get } from 'svelte/store';
import { storedToken } from '$stores/token.store';

class Client {
	private _connection: AxiosInstance;

	constructor() {
		// CONNECTION
		this._connection = Axios.create({
			baseURL: 'http://localhost:5005',
			timeout: 15000,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${get(storedToken)}`
			}
		});

		// TOKEN - Only if the storedToken store is used somewhere (for now it is here just to make sure), shouldn't be used - instead use setToken() method
		storedToken.subscribe((t) => {
			this._connection.defaults.headers.Authorization = `Bearer ${t}`;
		});
	}

	/**
	 * Get the connection instance of the client to the API
	 *
	 * @returns {AxiosInstance}
	 */
	public get axiosInstance(): AxiosInstance {
		return this._connection;
	}
}

export const client = new Client();
