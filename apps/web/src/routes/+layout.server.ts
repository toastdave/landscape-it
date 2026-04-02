export async function load({ locals }) {
	return {
		session: locals.user
			? {
					user: {
						id: locals.user.id,
						name: locals.user.name,
						email: locals.user.email,
						image: locals.user.image ?? null,
					},
					session: locals.session,
				}
			: null,
		auth: {
			enabledProviders: [],
		},
	}
}
