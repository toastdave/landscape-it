declare global {
	namespace App {
		interface Locals {
			session: {
				id: string
				expiresAt: Date
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
