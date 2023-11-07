import { storedToken } from '$stores/token.store';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	if (get(storedToken)) {
		throw redirect(301, '/app');
	}
}) satisfies LayoutLoad;
