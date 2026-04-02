import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = null
	event.locals.user = null

	return resolve(event)
}
