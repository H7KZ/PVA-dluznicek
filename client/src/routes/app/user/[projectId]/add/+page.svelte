<script lang="ts">
	import { goto } from '$app/navigation';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';
	import { onMount } from 'svelte';
	import type { Project } from '@dluznicek.js/routes/project';
	import { page } from '$app/stores';

	let form = {
		user: ''
	};
	let loading = false;

	let project: Project;
	let error: string;

	onMount(async () => {
		const { error: e, project: p } = await useDluznicek.project.getProject($page.params.projectId);

		if (e) {
			console.error(e);
			error = e.message;
		}

		if (p) project = p;
	});

	async function addUser() {
		loading = true;

		let userId = '';

		const { user } = await useDluznicek.user.getUserByEmail(form.user);

		if (user) {
			userId = user._id;
		} else {
			error = `User ${form.user} not found`;
			loading = false;
			return;
		}

		const { error: e, project: p } = await useDluznicek.project.updateProject(project?._id ?? '', {
			name: project.name,
			userIds: [...project.userIds, userId]
		});

		if (e) {
			error = (e.response?.data as { message: string }).message || e.message;
		}

		if (project) {
			goto('/app/project/' + project._id);
		}

		loading = false;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8">
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			Add user
		</h1>
	</div>
	<form class="flex w-full max-w-2xl flex-col gap-8" on:submit|preventDefault={addUser}>
		<TextInput
			label="User email"
			placeholder="User email"
			type="text"
			required
			autocomplete="off"
			id="user"
			name="user"
			bind:value={form.user}
		/>
		<div class="flex flex-col gap-3">
			<Button {loading}>Add user</Button>
		</div>
	</form>
	<p class="text-error-gradient h-20 text-sm">
		{error ?? ''}
	</p>
</div>
