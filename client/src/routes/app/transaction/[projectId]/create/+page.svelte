<script lang="ts">
	import { goto } from '$app/navigation';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';
	import { onMount } from 'svelte';
	import type { Project } from '@dluznicek.js/routes/project';
	import { page } from '$app/stores';

	let form: {
		name: string;
		users: {
			userId: string;
			amount: number;
		}[];
		user: string;
		amount: number;
	} = {
		name: '',
		users: [],
		user: '',
		amount: 0
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

		const { error: e, transaction: t } = await useDluznicek.transaction.createTransaction(
			project._id,
			{
				name: form.name,
				users: form.users
			}
		);

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
			Create transaction
		</h1>
	</div>
	<form class="flex w-full max-w-2xl flex-col gap-8" on:submit|preventDefault={addUser}>
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
		{#each form.users as user}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => {
					form.users = form.users.filter((u) => u.userId !== user.userId);
				}}
				class="bg-primary-gradient flex cursor-pointer items-center justify-between gap-3 rounded-md p-3"
			>
				<p>
					{user.userId}: {user.amount}
				</p>
			</div>
		{/each}
		<div class="flex flex-col gap-3">
			<TextInput
				label="User"
				placeholder="User"
				type="text"
				autocomplete="off"
				id="user"
				name="user"
				bind:value={form.user}
			/>
			<TextInput
				label="Amount"
				placeholder="Amount"
				type="number"
				autocomplete="off"
				id="amount"
				name="amount"
				bind:value={form.amount}
			/>
			<Button
				type="button"
				on:click={async () => {
					const { user } = await useDluznicek.user.getUserByEmail(form.user);

					if (!user) {
						error = `User ${form.user} not found`;
						return;
					}

					form.users = [
						...form.users,
						{
							userId: user._id,
							amount: form.amount
						}
					];
					form.user = '';
					form.amount = 0;
				}}
			>
				Add user
			</Button>
			<div class="flex flex-col gap-3">
				<Button {loading}>Create transaction</Button>
			</div>
		</div>
		<p class="text-error-gradient h-20 text-sm">
			{error ?? ''}
		</p>
	</form>
</div>
