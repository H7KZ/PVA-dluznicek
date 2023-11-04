import { useFigurique } from '@figurique.js';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { token } = params;

	const { error: e, success: s } = await useFigurique.auth.signUpConfirm(token);

	if (e) {
		return {
			success: false,
			error: (e.response?.data as { message: string }).message || e.message
		};
	}

	if (s) {
		return {
			success: true
		};
	}
}) satisfies PageLoad;
