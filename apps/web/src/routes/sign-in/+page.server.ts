import { auth } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'

function getNextUrl(formData: FormData) {
	return String(formData.get('next') ?? '/account')
}

export async function load({ parent, url }) {
	const layoutData = await parent()

	return {
		enabledProviders: layoutData.auth.enabledProviders,
		emailPasswordEnabled: layoutData.auth.emailPasswordEnabled,
		session: layoutData.session,
		reason: url.searchParams.get('reason'),
		next: url.searchParams.get('next') ?? '/account',
	}
}

export const actions = {
	signUp: async (event) => {
		const formData = await event.request.formData()
		const next = getNextUrl(formData)
		const name = String(formData.get('name') ?? '').trim()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!name || !email || !password) {
			return fail(400, {
				mode: 'create-account',
				error: 'Name, email, and password are required.',
			})
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
					callbackURL: next,
				},
				headers: event.request.headers,
			})
			redirect(303, next)
		} catch (error) {
			return fail(400, {
				mode: 'create-account',
				error: error instanceof Error ? error.message : 'Unable to create the account.',
			})
		}
	},
	signIn: async (event) => {
		const formData = await event.request.formData()
		const next = getNextUrl(formData)
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!email || !password) {
			return fail(400, {
				mode: 'sign-in',
				error: 'Email and password are required.',
			})
		}

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: next,
				},
				headers: event.request.headers,
			})
			redirect(303, next)
		} catch (error) {
			return fail(400, {
				mode: 'sign-in',
				error: error instanceof Error ? error.message : 'Unable to sign in.',
			})
		}
	},
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers,
		})
		redirect(303, '/')
	},
}
