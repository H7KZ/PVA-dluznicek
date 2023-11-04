import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@figurique.js': './src/@figurique.js/*',
			$components: './src/components/*',
			$assets: './src/assets/*',
			$icons: './src/icons/*',
			$lib: './src/lib/*',
			$routes: './src/routes/*',
			$stores: './src/stores/*',
			$types: './src/types/*',
			$utils: './src/utils/*',
			$i18n: './src/i18n/*',
			$images: './src/images/*'
		}
	}
};

export default config;
