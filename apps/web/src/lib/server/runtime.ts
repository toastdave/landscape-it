const devDefaults = {
	BETTER_AUTH_SECRET: 'landscape-it-local-dev-secret-change-me-123456',
	BETTER_AUTH_URL: 'http://localhost:2201',
	PUBLIC_APP_URL: 'http://localhost:2201',
	DATABASE_URL: 'postgresql://postgres:postgres@localhost:2202/landscape_it',
	LANDSCAPE_STORAGE_DRIVER: 'local',
	S3_ENDPOINT: 'http://localhost:2205',
	S3_BUCKET: 'landscape-it',
	S3_REGION: 'us-east-1',
	S3_ACCESS_KEY: 'minio',
	S3_SECRET_KEY: 'minio123',
	SMTP_HOST: 'localhost',
	SMTP_PORT: '2203',
} as const

type RuntimeKey = keyof typeof devDefaults

function readString(name: string) {
	const value = process.env[name]?.trim()
	return value ? value : null
}

export function isProduction() {
	return process.env.NODE_ENV === 'production'
}

export function getRuntimeEnv(name: RuntimeKey | string, fallback?: string) {
	const explicitValue = readString(name)

	if (explicitValue) {
		return explicitValue
	}

	if (fallback) {
		return fallback
	}

	if (!isProduction() && name in devDefaults) {
		return devDefaults[name as RuntimeKey]
	}

	return null
}

export function getTrustedOrigins() {
	const configuredOrigins = (getRuntimeEnv('BETTER_AUTH_TRUSTED_ORIGINS') ?? '')
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean)

	return Array.from(
		new Set(
			[
				getRuntimeEnv('BETTER_AUTH_URL'),
				getRuntimeEnv('PUBLIC_APP_URL'),
				'http://localhost:2201',
				...configuredOrigins,
			].filter((value): value is string => Boolean(value))
		)
	)
}

export function isStorageDriverEnabled(driver: 'local' | 's3') {
	return (getRuntimeEnv('LANDSCAPE_STORAGE_DRIVER', 'local') ?? 'local') === driver
}

export function getEnabledAuthProviders() {
	const providers: string[] = []

	if (getRuntimeEnv('GOOGLE_CLIENT_ID') && getRuntimeEnv('GOOGLE_CLIENT_SECRET')) {
		providers.push('google')
	}

	return providers
}
