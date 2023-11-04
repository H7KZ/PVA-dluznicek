import type { LayoutLoad } from './$types';
import { storedToken } from '$stores/token.store';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	if (get(storedToken)) {
		throw redirect(301, '/dashboard');
	}
}) satisfies LayoutLoad;
