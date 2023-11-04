<script lang="ts">
	import { storedTheme } from '$stores/theme.store';
	import { get } from 'svelte/store';
</script>

<div class="flex h-screen w-full flex-col items-center justify-center gap-4">
	<div class="flex flex-col gap-4">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="w-40"
			on:click={() =>
				get(storedTheme) === 'dark' ? storedTheme.set('light') : storedTheme.set('dark')}
		>
			<img src="/icons/figurique.svg" alt="Fig" />
		</div>
	</div>
</div>
