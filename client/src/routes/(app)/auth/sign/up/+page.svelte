<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$i18n/translations';
	import Checkbox from '$components/form/ToggleInput.svelte';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import SignLayout from '$lib/layouts/SignLayout.svelte';
	import { useFigurique } from '@figurique.js';
	import { AxiosError } from 'axios';

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

		if (form.password !== form.confirmPassword) {
			error = $t('common.signup.error.passwords');
			loading = false;
			return;
		}

		const { error: e, success } = await useFigurique.auth.signUp({
			email: form.email,
			password: form.password,
			confirmPassword: form.confirmPassword,
			name: form.name,
			surname: form.surname,
			news: form.news,
			terms: form.terms
		});

		if (e) {
			if (e instanceof AxiosError) {
				error = (e.response?.data as { message: string }).message || e.message;
			} else {
				error = e.message
					.split('. ')
					.map((v: string) => $t(v))
					.join('. ');
			}
		}

		if (success) {
			goto('/auth/sign/confirm');
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Figurique | {$t('common.signup.title')}</title>
</svelte:head>

<SignLayout>
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signup.title')}
		</h1>
		<p class="text-xl font-medium">
			{$t('common.signup.subtitle')}
		</p>
	</div>
	<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signUp}>
		<TextInput
			label={$t('common.signup.email')}
			placeholder={$t('common.signup.email')}
			type="email"
			required
			autocomplete="email"
			id="email"
			name="email"
			bind:value={form.email}
		/>
		<TextInput
			label={$t('common.signup.password')}
			placeholder={$t('common.signup.password')}
			type="password"
			required
			autocomplete="new-password"
			id="password"
			name="password"
			bind:value={form.password}
		/>
		<TextInput
			label={$t('common.signup.confirmPassword')}
			placeholder={$t('common.signup.confirmPassword')}
			type="password"
			required
			autocomplete="new-password"
			id="confirm-password"
			name="confirm-password"
			bind:value={form.confirmPassword}
		/>
		<div class="flex w-full gap-6">
			<TextInput
				label={$t('common.signup.name')}
				placeholder={$t('common.signup.name')}
				type="text"
				required
				autocomplete="given-name"
				id="name"
				name="name"
				bind:value={form.name}
			/>
			<TextInput
				label={$t('common.signup.surname')}
				placeholder={$t('common.signup.surname')}
				type="text"
				required
				autocomplete="family-name"
				id="surname"
				name="surname"
				bind:value={form.surname}
			/>
		</div>
		<Checkbox label={$t('common.signup.news')} id="news" name="news" bind:value={form.news} />
		<Checkbox
			label={$t('common.signup.terms')}
			required
			id="terms"
			name="terms"
			bind:value={form.terms}
		/>
		<div class="flex flex-col gap-3">
			<Button arrow {loading}>
				{$t('common.signup.signup')}
			</Button>
			<div class="flex w-full justify-between text-sm text-primary-peach underline">
				<a href="/auth/sign/resend" class="transition-all hover:text-primary-orange">
					{$t('common.signup.no-link')}
				</a>
				<a href="/auth/sign/in" class="transition-all hover:text-primary-orange">
					{$t('common.signup.signin')}
				</a>
			</div>
		</div>
	</form>
	<p class="text-error-gradient h-20 text-sm">
		{error}
	</p>
</SignLayout>
