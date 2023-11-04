<script lang="ts">
	import { t } from '$i18n/translations';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import SignLayout from '$lib/layouts/SignLayout.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import delay from '$utils/delay';
	import { useFigurique } from '@figurique.js';
	import { AxiosError } from 'axios';

	let form = {
		password: '',
		confirmPassword: ''
	};
	let error = '';
	let success = false;
	let loading = false;

	async function signInForgotConfirm() {
		loading = true;

		if (form.password !== form.confirmPassword) {
			error = $t('common.signup.error.passwords');
			loading = false;
			return;
		}

		const { error: e, success: s } = await useFigurique.auth.resetPasswordConfirm({
			token: $page.params.token,
			password: form.password,
			confirmPassword: form.confirmPassword
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

		if (s) {
			success = true;
			await delay(4000);
			goto('/auth/sign/in');
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Figurique | {$t('common.signin.forgot.confirm.title')}</title>
</svelte:head>

<SignLayout>
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signin.forgot.confirm.title')}
		</h1>
		<p class="text-xl font-medium">
			{$t('common.signin.forgot.confirm.subtitle')}
		</p>
	</div>
	<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signInForgotConfirm}>
		<TextInput
			label={$t('common.signin.forgot.confirm.password')}
			placeholder={$t('common.signin.forgot.confirm.password')}
			type="password"
			required
			autocomplete="new-password"
			id="password"
			name="password"
			bind:value={form.password}
		/>
		<TextInput
			label={$t('common.signin.forgot.confirm.confirmPassword')}
			placeholder={$t('common.signin.forgot.confirm.confirmPassword')}
			type="password"
			required
			autocomplete="new-password"
			id="confirm-password"
			name="confirm-password"
			bind:value={form.confirmPassword}
		/>
		<div class="flex flex-col gap-3">
			<Button label={$t('common.signin.forgot.confirm.confirm')} {loading} />
			<div class="flex w-full justify-start text-sm text-primary-peach underline">
				<a href="/auth/sign/in" class="transition-all hover:text-primary-orange">
					{$t('common.signin.forgot.confirm.back')}
				</a>
			</div>
		</div>
	</form>
	<p class="{success ? 'text-success-gradient' : 'text-error-gradient'} h-20 text-sm">
		{success ? $t('common.signin.forgot.confirm.success') : error}
	</p>
</SignLayout>
