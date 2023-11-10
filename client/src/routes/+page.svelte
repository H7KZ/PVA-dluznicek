<script lang="ts">
	import { goto } from '$app/navigation';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';

	let form = {
		email: '',
		password: ''
	};
	let error = '';
	let loading = false;

	async function signIn() {
		loading = true;

		const { error: e, success: s } = await useDluznicek.auth.signIn({
			email: form.email,
			password: form.password
		});

		if (e) {
			error = (e.response?.data as { message: string }).message || e.message;
		}

		if (s) {
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
			Sign in
		</h1>
	</div>
	<form class="flex w-full max-w-2xl flex-col gap-8" on:submit|preventDefault={signIn}>
		<TextInput
			label="Email"
			placeholder="Email"
			type="email"
			required
			autocomplete="email"
			id="email"
			name="email"
			bind:value={form.email}
		/>
		<TextInput
			label="Password"
			placeholder="Password"
			type="password"
			required
			autocomplete="current-password"
			id="password"
			name="password"
			bind:value={form.password}
		/>
		<div class="flex flex-col gap-3">
			<Button {loading}>Sign in</Button>
			<a href="/sign/up"> Sign up </a>
		</div>
	</form>
	<p class="text-error-gradient h-20 text-sm">
		{error}
	</p>
</div>
