declare global {
	namespace App {
		interface Locals {
			session: {
				id: string
				token?: string | null
				expiresAt: Date
				createdAt?: Date
				updatedAt?: Date
				ipAddress?: string | null
				userAgent?: string | null
				userId: string
			} | null
			user: {
				id: string
				name: string
				email: string
				image?: string | null
			} | null
		}
	}
}

export {}
