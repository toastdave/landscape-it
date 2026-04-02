import { billingSnapshot } from '$lib/data/showcase'

export async function load() {
	return {
		billing: billingSnapshot,
	}
}
