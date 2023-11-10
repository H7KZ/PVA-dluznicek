<script lang="ts">
	import Loading from '$components/common/Loading.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';
	import type { Project } from '@dluznicek.js/routes/project';
	import type { Me } from '@dluznicek.js/routes/user';
	import { onMount } from 'svelte';

	let me: Me;
	let projects: Project[] = [];
	let error: string;

	onMount(async () => {
		const { error: e, me: m } = await useDluznicek.user.getMe();

		if (e) {
			console.error(e);
			error = e.message;
		}

		if (m) me = m;

		for (const projectId of me.projectIds) {
			const { error: e, project: p } = await useDluznicek.project.getProject(projectId);

			if (e) {
				console.error(e);
				error = e.message;
			}

			if (p) projects = [...projects, p];
		}
	});
</script>

<Loading data={[me]} {error}>
	<div class="flex h-full w-full flex-col items-center justify-center gap-8">
		<div class="mb-12 flex flex-col items-center text-center">
			<h1
				class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
			>
				My projects
			</h1>
		</div>
		<div class="flex flex-col gap-3">
			{#each projects as project}
				<a href="/app/project/{project._id}">
					<Button>
						Project: {project.name}
					</Button>
				</a>
			{/each}
			<a href="/app/project/create" class="pt-8">
				<Button>Create project</Button>
			</a>
		</div>
	</div>
</Loading>
