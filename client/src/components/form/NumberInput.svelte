<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let required = false;
	export let disabled = false;
	export let readonly = false;

	export let min = 0;
	export let max: number | undefined = undefined;

	export let value = min;
</script>

<div class="flex w-full flex-col gap-1 font-normal">
	{#if label}
		<label for={id} class="text-sm text-primary-gray-darker dark:text-primary-gray">
			{label}
			{#if required}
				<span class="text-primary-orange">*</span>
			{/if}
		</label>
	{/if}
	<input
		type="number"
		{min}
		{max}
		{id}
		{name}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		bind:value
		class="w-full rounded-lg border-2 border-primary-gray-darker dark:border-primary-gray {value
			? '!border-primary-black dark:!border-primary-white'
			: ''} bg-transparent p-2.5 px-4 text-sm transition-all hover:!border-primary-peach focus:!border-primary-peach focus:outline-none"
	/>
</div>
