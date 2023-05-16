import { writable } from 'svelte/store';

export const user = writable({
	username: 'lehithings',
	name: 'Lehi Alcantara',
	email: 'lehilds@gmail.com'
});