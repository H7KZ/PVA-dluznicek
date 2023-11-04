import type { AxiosError, AxiosResponse } from 'axios';
import { client } from '@figurique.js/client';

interface Project {
	_id: string;
	name: string;
	userIds: string[];
	transactionIds: string[];
}

class ProjectsRoute {
	public async getProject(projectId: string): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.get(`/project/${projectId}`)
			.then((s: AxiosResponse) => {
				project = s.data.project as Project;
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
			.post('/project', { name })
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
		name: string
	): Promise<{ error?: AxiosError; project?: Project }> {
		let err: AxiosError | undefined;
		let project: Project | undefined;

		await client.axiosInstance
			.put(`/project/${projectId}`, { name })
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
			.delete(`/project/${projectId}`)
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
