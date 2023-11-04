<script lang="ts">
	import { t } from '$i18n/translations';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import SignLayout from '$lib/layouts/SignLayout.svelte';
	import { useFigurique } from '@figurique.js';
	import { AxiosError } from 'axios';

	let form = {
		email: ''
	};
	let error = '';
	let success = false;
	let loading = false;

	async function signUpResend() {
		loading = true;

		const { error: e, success: s } = await useFigurique.auth.signUpResend(form.email);

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
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Figurique | {$t('common.signup.resend.title')}</title>
</svelte:head>

<SignLayout>
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signup.resend.title')}
		</h1>
		<p class="text-xl font-medium">
			{$t('common.signup.resend.subtitle')}
		</p>
	</div>
	<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signUpResend}>
		<TextInput
			label={$t('common.signup.resend.email')}
			placeholder={$t('common.signup.resend.email')}
			type="email"
			required
			autocomplete="email"
			id="email"
			name="email"
			bind:value={form.email}
		/>
		<Button arrow {loading}>
			{$t('common.signup.resend.resend')}
		</Button>
	</form>
	<p class="{success ? 'text-success-gradient' : 'text-error-gradient'} h-20 text-sm">
		{success ? $t('common.signup.resend.success') : error}
	</p>
</SignLayout>
