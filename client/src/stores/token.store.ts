import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let token = '';

if (browser) {
	token = localStorage.getItem('token') ?? token;
}

export const storedToken = writable(token);

if (browser) {
	storedToken.subscribe((v) => localStorage.setItem('token', v.toString()));
}
