import { getRequestEvent } from '$app/server'
import { createDb } from '@landscape_it/db'
import * as schema from '@landscape_it/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { getEnabledAuthProviders, getRuntimeEnv, getTrustedOrigins } from './runtime'

const db = createDb(getRuntimeEnv('DATABASE_URL') ?? undefined)

const enabledProviders = getEnabledAuthProviders()

export const auth = betterAuth({
	appName: 'Landscape It',
	baseURL: getRuntimeEnv('BETTER_AUTH_URL') ?? 'http://localhost:2201',
	secret: getRuntimeEnv('BETTER_AUTH_SECRET') ?? undefined,
	trustedOrigins: getTrustedOrigins(),
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
	},
	socialProviders: {
		...(enabledProviders.includes('google')
			? {
					google: {
						clientId: getRuntimeEnv('GOOGLE_CLIENT_ID') as string,
						clientSecret: getRuntimeEnv('GOOGLE_CLIENT_SECRET') as string,
					},
				}
			: {}),
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5,
		},
	},
	plugins: [sveltekitCookies(getRequestEvent)],
})

export { db, enabledProviders }
