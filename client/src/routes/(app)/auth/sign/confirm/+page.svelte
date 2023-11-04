<script lang="ts">
	import { t } from '$i18n/translations';
	import MailBox from '$icons/MailBox.svelte';
</script>

<svelte:head>
	<title>Figurique | {$t('common.signup.confirm.title')}</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
	<div class="flex w-full max-w-4xl flex-col items-center gap-12 px-6 py-16 text-center">
		<h1
			class="text-primary-gradient text-4xl uppercase leading-[4rem] sm:text-5xl sm:leading-[4rem]"
		>
			{$t('common.signup.confirm.title')}
		</h1>
		<div class="w-32 sm:w-48">
			<MailBox />
		</div>
		<p class="text-xl font-medium">
			{$t('common.signup.confirm.subtitle')}
		</p>
	</div>
</div>
