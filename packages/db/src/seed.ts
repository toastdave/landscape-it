import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { createDbClient } from './client'
import { buildCreditPackCatalog } from './pricing'
import { creditPack } from './schema/index'

const client = createDbClient()
const db = drizzle(client)

try {
	await db
		.insert(creditPack)
		.values(buildCreditPackCatalog())
		.onConflictDoUpdate({
			target: creditPack.id,
			set: {
				slug: sql`excluded.slug`,
				name: sql`excluded.name`,
				credits: sql`excluded.credits`,
				priceCents: sql`excluded.price_cents`,
				polarProductId: sql`excluded.polar_product_id`,
				updatedAt: new Date(),
			},
		})

	console.log('Seeded credit packs')
} finally {
	await client.end({ timeout: 1 })
}
