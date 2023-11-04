/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			},
			colors: {
				primary: {
					orange: '#F18531',
					peach: '#EE734E',
					pink: '#E84D8A',
					white: '#EEEEEE',
					black: '#0F0F0F',
					gray: {
						light: '#E3E3E3',
						DEFAULT: '#9F9F9F',
						darker: '#6A6A6A',
						dark: '#1A1A1A'
					},
					red: '#EF3C3C',
					green: '#0AA310'
				}
			},
			screens: {
				'8xl': '1440px',
				'9xl': '1720px',
				xs: '480px'
			},
			maxWidth: {
				'8xl': '1440px',
				'9xl': '1720px'
			},
			minWidth: {
				'8xl': '1440px',
				'9xl': '1720px'
			},
			borderWidth: {
				1.5: '1.5px',
				1: '1px'
			}
		}
	}
};
