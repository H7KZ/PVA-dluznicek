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

	async function signInForgot() {
		loading = true;

		const { error: e, success: s } = await useFigurique.auth.resetPassword(form.email);

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
	<title>Figurique | {$t('common.signin.forgot.title')}</title>
</svelte:head>

<SignLayout>
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signin.forgot.title')}
		</h1>
		<p class="text-xl font-medium">
			{$t('common.signin.forgot.subtitle')}
		</p>
	</div>
	<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signInForgot}>
		<TextInput
			label={$t('common.signin.forgot.email')}
			placeholder={$t('common.signin.forgot.email')}
			type="email"
			required
			autocomplete="email"
			id="email"
			name="email"
			bind:value={form.email}
		/>
		<div class="flex flex-col gap-3">
			<Button arrow {loading}>
				{$t('common.signin.forgot.send')}
			</Button>
			<div class="flex w-full justify-start text-sm text-primary-peach underline">
				<a href="/auth/sign/in" class="transition-all hover:text-primary-orange">
					{$t('common.signin.forgot.back')}
				</a>
			</div>
		</div>
	</form>
	<p class="{success ? 'text-success-gradient' : 'text-error-gradient'} h-20 text-sm">
		{success ? $t('common.signin.forgot.success') : error}
	</p>
</SignLayout>
