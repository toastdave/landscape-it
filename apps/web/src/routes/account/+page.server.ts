import { accountSnapshot } from '$lib/data/showcase'

export async function load() {
	return {
		account: accountSnapshot,
	}
}
