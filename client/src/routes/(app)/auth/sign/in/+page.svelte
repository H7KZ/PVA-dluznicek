<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$i18n/translations';
	import Checkbox from '$components/form/CustomCheckBox.svelte';
	import TextInput from '$components/form/TextInput.svelte';
	import Button from '$components/form/Button.svelte';
	import SignLayout from '$lib/layouts/SignLayout.svelte';
	import { useFigurique } from '@figurique.js';
	import { AxiosError } from 'axios';

	let form = {
		email: '',
		password: '',
		remember: false
	};
	let error = '';
	let loading = false;

	async function signIn() {
		loading = true;

		const { error: e, success: s } = await useFigurique.auth.signIn({
			email: form.email,
			password: form.password,
			remember: form.remember
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
			goto('/dashboard');
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Figurique | {$t('common.signin.title')}</title>
</svelte:head>

<SignLayout>
	<div class="mb-12 flex flex-col items-center text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signin.title')}
		</h1>
		<p class="text-xl font-medium">
			{$t('common.signin.subtitle')}
		</p>
	</div>
	<form class="flex w-full flex-col gap-8" on:submit|preventDefault={signIn}>
		<TextInput
			label={$t('common.signin.email')}
			placeholder={$t('common.signin.email')}
			type="email"
			required
			autocomplete="email"
			id="email"
			name="email"
			bind:value={form.email}
		/>
		<TextInput
			label={$t('common.signin.password')}
			placeholder={$t('common.signin.password')}
			type="password"
			required
			autocomplete="current-password"
			id="password"
			name="password"
			bind:value={form.password}
		/>
		<Checkbox
			label={$t('common.signin.remember')}
			id="check"
			name="remember"
			bind:value={form.remember}
		/>
		<div class="flex flex-col gap-3">
			<Button arrow {loading}>
				{$t('common.signin.signin')}
			</Button>
			<div class="flex w-full justify-between text-sm text-primary-peach underline">
				<a href="/auth/sign/forgot" class="transition-all hover:text-primary-orange">
					{$t('common.signin.forgot_password')}
				</a>
				<a href="/auth/sign/up" class="transition-all hover:text-primary-orange">
					{$t('common.signin.signup')}
				</a>
			</div>
		</div>
	</form>
	<p class="text-error-gradient h-20 text-sm">
		{error}
	</p>
</SignLayout>
