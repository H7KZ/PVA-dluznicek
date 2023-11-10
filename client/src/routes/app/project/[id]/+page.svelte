<script lang="ts">
	import { page } from '$app/stores';
	import Loading from '$components/common/Loading.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';
	import type { Project } from '@dluznicek.js/routes/project';
	import type { Transaction } from '@dluznicek.js/routes/transaction';
	import type { Me, User } from '@dluznicek.js/routes/user';
	import { onMount } from 'svelte';

	let project: Project;
	let transactions: Transaction[] = [];
	let users: User[] = [];
	let error: string;

	onMount(async () => {
		const { error: e, project: p } = await useDluznicek.project.getProject($page.params.id);

		if (e) {
			console.error(e);
			error = e.message;
		}

		if (p) project = p;

		for (const transactionId of project.transactionIds) {
			const { error: e, transaction: t } = await useDluznicek.transaction.getTransaction(
				transactionId
			);

			if (e) {
				console.error(e);
				error = e.message;
			}

			if (t) transactions = [...transactions, t];
		}

		for (const userId of project.userIds) {
			const { error: e, user: u } = await useDluznicek.user.getUserById(userId);

			if (e) {
				console.error(e);
				error = e.message;
			}

			if (u) users = [...users, u];
		}
	});
</script>

<Loading data={[project]} {error}>
	<div class="flex h-full w-full flex-col items-center justify-center gap-8">
		<div class="mb-12 flex flex-col items-center text-center">
			<h1
				class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
			>
				{project.name}
			</h1>
		</div>
		<div class="flex flex-col gap-3">
			{#each users as user}
				<p>
					{user.name}: {project.accounts.find((account) => account.userId === user._id)?.amount ??
						0}
				</p>
			{/each}
			<a href="/app/user/{project._id}/add" class="pt-8">
				<Button>Add user</Button>
			</a>
		</div>
		<div class="flex flex-col gap-3">
			{#each transactions as transaction}
				<p>
					{transaction.name}
				</p>
				{#each transaction.users as user}
					<p>
						{users.find((u) => u._id === user.userId)?.name ?? 'Unknown'}: {user.amount}
					</p>
				{/each}
			{/each}
			<a href="/app/transaction/{project._id}/create" class="pt-8">
				<Button>Create transaction</Button>
			</a>
		</div>
	</div>
</Loading>
