import type { Cookies, RequestEvent } from '@sveltejs/kit'

export const GUEST_COOKIE_NAME = 'landscape_it_guest_id'

type AuthenticatedViewerSession = {
	kind: 'user'
	viewerId: string
	label: string
	email: string
	name: string
}

type GuestViewerSession = {
	kind: 'guest'
	viewerId: string
	guestId: string
	label: string
}

export type ViewerSession = AuthenticatedViewerSession | GuestViewerSession

export function buildGuestViewerId(guestId: string) {
	return `guest:${guestId}`
}

export function getGuestId(cookies: Cookies) {
	return cookies.get(GUEST_COOKIE_NAME) ?? null
}

export function clearGuestSession(cookies: Cookies) {
	cookies.delete(GUEST_COOKIE_NAME, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
	})
}

function createAuthenticatedViewerSession(event: RequestEvent): AuthenticatedViewerSession | null {
	if (!event.locals.user) {
		return null
	}

	return {
		kind: 'user',
		viewerId: event.locals.user.id,
		label: event.locals.user.name,
		email: event.locals.user.email,
		name: event.locals.user.name,
	}
}

export async function getOrCreateViewerSession(event: RequestEvent): Promise<ViewerSession> {
	const authenticatedViewer = createAuthenticatedViewerSession(event)

	if (authenticatedViewer) {
		return authenticatedViewer
	}

	let guestId = getGuestId(event.cookies)

	if (!guestId) {
		guestId = crypto.randomUUID()
		event.cookies.set(GUEST_COOKIE_NAME, guestId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30,
		})
	}

	return {
		kind: 'guest',
		viewerId: buildGuestViewerId(guestId),
		guestId,
		label: 'Guest homeowner',
	}
}
