<script lang="ts">
	import { goto } from '$app/navigation';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import { useDluznicek } from '@dluznicek.js';

	let form = {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		surname: '',
		news: false,
		terms: false
	};
	let error = '';
	let loading = false;

	async function signUp() {
		loading = true;

		const { error: e, success } = await useDluznicek.auth.signUp({
			email: form.email,
			password: form.password,
			name: form.name
		});

		if (e) {
			error = (e.response?.data as { message: string }).message || e.message;
		}

		if (success) {
			goto('/sign/in');
		}

		loading = false;
	}
</script>

<div class="mb-12 flex flex-col items-center text-center">
	<h1 class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]">
		Sign up
	</h1>
</div>
<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signUp}>
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
		autocomplete="new-password"
		id="password"
		name="password"
		bind:value={form.password}
	/>
	<TextInput
		label="Name"
		placeholder="Name"
		type="text"
		required
		autocomplete="given-name"
		id="name"
		name="name"
		bind:value={form.name}
	/>
	<div class="flex flex-col gap-3">
		<Button {loading}>Sign up</Button>
	</div>
</form>
<p class="text-error-gradient h-20 text-sm">
	{error}
</p>
