<script lang="ts">
	type AutocompleteMode =
		| 'on'
		| 'off'
		| 'name'
		| 'honorific-prefix'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-suffix'
		| 'nickname'
		| 'email'
		| 'username'
		| 'new-password'
		| 'current-password'
		| 'one-time-code'
		| 'organization-title'
		| 'organization'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'address-level-4'
		| 'address-level-3'
		| 'address-level-2'
		| 'address-level-1'
		| 'country'
		| 'country-name'
		| 'postal-code'
		| 'cc-name'
		| 'cc-exp'
		| 'cc-exp-year'
		| 'cc-csc'
		| 'cc-type'
		| 'transaction-currency'
		| 'transaction-amount'
		| 'language'
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'sex'
		| 'tel'
		| 'tel-country-code'
		| 'tel-national'
		| 'tel-area-code'
		| 'tel-local'
		| 'tel-extension'
		| 'impp'
		| 'url'
		| 'photo';

	export let label = '';
	export let placeholder = '';
	export let type = 'text';
	export let id = '';
	export let name = '';
	export let autocomplete: AutocompleteMode = 'off';
	export let required = false;
	export let disabled = false;
	export let readonly = false;

	export let value: string | number = '';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class="flex w-full flex-col gap-1 font-normal">
	{#if label}
		<label for={id} class="text-sm text-primary-gray-darker">
			{label}
			{#if required}
				<span class="text-amber-500">*</span>
			{/if}
		</label>
	{/if}
	<input
		use:typeAction
		{id}
		{name}
		{placeholder}
		{autocomplete}
		{required}
		{disabled}
		{readonly}
		bind:value
		class="w-full rounded-lg border-2 border-primary-gray-darker {value
			? '!border-primary-black'
			: ''} bg-transparent p-2.5 px-4 text-sm transition-all hover:!border-amber-500 focus:!border-amber-500 focus:outline-none"
	/>
</div>
