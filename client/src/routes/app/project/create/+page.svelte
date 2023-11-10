<script lang="ts">
	import { goto } from '$app/navigation';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';

	let form = {
		name: ''
	};
	let error = '';
	let loading = false;

	async function createProject() {
		loading = true;

		const { error: e, project } = await useDluznicek.project.createProject(form.name);

		if (e) {
			error = (e.response?.data as { message: string }).message || e.message;
		}

		if (project) {
			goto('/app');
		}

		loading = false;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8">
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			Create project
		</h1>
	</div>
	<form class="flex w-full max-w-2xl flex-col gap-8" on:submit|preventDefault={createProject}>
		<TextInput
			label="Name"
			placeholder="Name"
			type="text"
			required
			autocomplete="off"
			id="name"
			name="name"
			bind:value={form.name}
		/>
		<div class="flex flex-col gap-3">
			<Button {loading}>Create project</Button>
		</div>
	</form>
	<p class="text-error-gradient h-20 text-sm">
		{error}
	</p>
</div>
