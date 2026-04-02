import { studioSnapshot } from '$lib/data/showcase'

export async function load() {
	return {
		studio: studioSnapshot,
	}
}
