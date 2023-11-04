<script lang="ts">
	import Button from '$components/form/Button.svelte';
	import { t } from '$i18n/translations';
	import NotepadCheck from '$icons/NotepadCheck.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import delay from '$utils/delay';
	import { goto } from '$app/navigation';

	export let data: PageData;

	onMount(async () => {
		if (data.success) {
			await delay(4000);
			goto('/auth/sign/in');
		}
	});
</script>

<svelte:head>
	<title
		>Figurique | {data.success
			? $t('common.signup.verify.success.title')
			: $t('common.signup.verify.error.title')}</title
	>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
	<div class="flex w-full max-w-4xl flex-col items-center gap-12 px-6 py-16 text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{data.success
				? $t('common.signup.verify.success.title')
				: $t('common.signup.verify.error.title')}
		</h1>
		<div class="w-32 sm:w-48">
			<NotepadCheck />
		</div>
		<p class="text-xl font-medium">
			{data.success ? $t('common.signup.verify.success.subtitle') : data.error}
		</p>
		<div class="w-full max-w-md">
			<a href="/auth/sign/in">
				<Button>
					{$t('common.signup.verify.success.signin')}
				</Button>
			</a>
		</div>
	</div>
</div>
