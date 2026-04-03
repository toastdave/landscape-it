import { building } from '$app/environment'
import { auth } from '$lib/server/auth'
import { migrateGuestWorkspaceToUser } from '$lib/server/landscape-workspace'
import { clearGuestSession, getGuestId } from '$lib/server/viewer-session'
import type { Handle } from '@sveltejs/kit'
import { svelteKitHandler } from 'better-auth/svelte-kit'

export const handle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers,
	})

	event.locals.session = session?.session ?? null
	event.locals.user = session?.user ?? null

	if (session?.user) {
		const guestId = getGuestId(event.cookies)

		if (guestId) {
			await migrateGuestWorkspaceToUser({
				guestId,
				userId: session.user.id,
			})
			clearGuestSession(event.cookies)
		}
	}

	return svelteKitHandler({ event, resolve, auth, building })
}
