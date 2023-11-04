import { loadTranslations, locale } from '$i18n/translations';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	const { pathname } = url;
	const defaultLocale = 'cs';
	const initLocale = locale.get() || defaultLocale;
	await loadTranslations(initLocale, pathname);

	return {};
}) satisfies LayoutLoad;
