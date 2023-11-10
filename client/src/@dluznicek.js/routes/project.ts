import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@dluznicek.js/client';

export interface Project {
	_id: string;
	name: string;
	userIds: string[];
	transactionIds: string[];
	accounts: Array<{
		userId: string;
		amount: number;
	}>;
}

class ProjectsRoute {
	public async getProject(projectId: string): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.get(`/projects/${projectId}`)
			.then((s: AxiosResponse) => {
				project = s.data.project.project as Project;
				project.accounts = s.data.project.accounts;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, project };
	}

	public async createProject(name: string): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.post('/projects', { name })
			.then((s: AxiosResponse) => {
				project = s.data.project as Project;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, project };
	}

	public async updateProject(
		projectId: string,
		{
			name,
			userIds
		}: {
			name: string;
			userIds: string[];
		}
	): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.patch(`/projects/${projectId}`, { name, userIds })
			.then((s: AxiosResponse) => {
				project = s.data.project as Project;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, project };
	}

	public async deleteProject(
		projectId: string
	): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.delete(`/projects/${projectId}`)
			.then((s: AxiosResponse) => {
				project = s.data.project as Project;
			})
			.catch((e: AxiosError) => {
				err = e;
			});

		return { error: err, project };
	}
}

export const project = new ProjectsRoute();
