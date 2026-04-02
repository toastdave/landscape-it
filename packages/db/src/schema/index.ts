import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'

export const projectTypeEnum = pgEnum('project_type', [
	'front_yard_refresh',
	'backyard_makeover',
	'patio_upgrade',
	'curb_appeal',
	'garden_bed_redesign',
	'outdoor_living',
])

export const projectStatusEnum = pgEnum('project_status', [
	'draft',
	'analyzing',
	'concept_ready',
	'archived',
])

export const maintenanceLevelEnum = pgEnum('maintenance_level', ['low', 'medium', 'high'])

export const sunExposureEnum = pgEnum('sun_exposure', [
	'full_sun',
	'part_shade',
	'full_shade',
	'mixed',
])

export const analysisStatusEnum = pgEnum('analysis_status', [
	'queued',
	'running',
	'completed',
	'failed',
])

export const conceptStatusEnum = pgEnum('concept_status', ['pending', 'generated', 'failed'])

export const recommendationTypeEnum = pgEnum('recommendation_type', [
	'plant',
	'hardscape',
	'lighting',
	'furniture',
	'irrigation',
])

export const creditLedgerTypeEnum = pgEnum('credit_ledger_type', [
	'grant',
	'purchase',
	'reservation',
	'settlement',
	'refund',
	'adjustment',
])

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull().default(false),
	image: text('image'),
	polarCustomerId: text('polar_customer_id'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(table) => [uniqueIndex('session_token_idx').on(table.token)]
)

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		index('account_user_idx').on(table.userId),
		uniqueIndex('account_provider_account_idx').on(table.providerId, table.accountId),
	]
)

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [uniqueIndex('verification_identifier_value_idx').on(table.identifier, table.value)]
)

export const creditPack = pgTable('credit_pack', {
	id: text('id').primaryKey(),
	slug: varchar('slug', { length: 64 }).notNull().unique(),
	name: varchar('name', { length: 120 }).notNull(),
	credits: integer('credits').notNull(),
	priceCents: integer('price_cents').notNull(),
	polarProductId: text('polar_product_id'),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const yardProject = pgTable(
	'yard_project',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		slug: varchar('slug', { length: 80 }).notNull().unique(),
		title: varchar('title', { length: 160 }).notNull(),
		projectType: projectTypeEnum('project_type').notNull(),
		status: projectStatusEnum('status').notNull().default('draft'),
		objective: text('objective'),
		budgetLabel: varchar('budget_label', { length: 80 }),
		climateZone: varchar('climate_zone', { length: 40 }),
		maintenanceLevel: maintenanceLevelEnum('maintenance_level').notNull().default('medium'),
		sunExposure: sunExposureEnum('sun_exposure').notNull().default('mixed'),
		petFriendly: boolean('pet_friendly').notNull().default(false),
		kidFriendly: boolean('kid_friendly').notNull().default(false),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		index('yard_project_user_idx').on(table.userId),
		index('yard_project_status_idx').on(table.status),
	]
)

export const sourcePhoto = pgTable(
	'source_photo',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		projectId: uuid('project_id')
			.notNull()
			.references(() => yardProject.id, { onDelete: 'cascade' }),
		objectKey: text('object_key').notNull().unique(),
		url: text('url'),
		mimeType: varchar('mime_type', { length: 120 }).notNull(),
		width: integer('width'),
		height: integer('height'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index('source_photo_project_idx').on(table.projectId)]
)

export const yardAnalysis = pgTable(
	'yard_analysis',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		projectId: uuid('project_id')
			.notNull()
			.references(() => yardProject.id, { onDelete: 'cascade' }),
		status: analysisStatusEnum('status').notNull().default('queued'),
		baseCreditsReserved: integer('base_credits_reserved').notNull().default(0),
		imageCreditsReserved: integer('image_credits_reserved').notNull().default(0),
		requestedImageCount: integer('requested_image_count').notNull().default(1),
		styleSummary: text('style_summary'),
		siteSummary: text('site_summary'),
		designPrinciples: jsonb('design_principles').notNull().default([]),
		phasedPlan: jsonb('phased_plan').notNull().default([]),
		errorMessage: text('error_message'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
		completedAt: timestamp('completed_at', { withTimezone: true }),
	},
	(table) => [index('yard_analysis_project_idx').on(table.projectId)]
)

export const landscapeConcept = pgTable(
	'landscape_concept',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		analysisId: uuid('analysis_id')
			.notNull()
			.references(() => yardAnalysis.id, { onDelete: 'cascade' }),
		status: conceptStatusEnum('status').notNull().default('pending'),
		label: varchar('label', { length: 120 }),
		prompt: text('prompt'),
		objectKey: text('object_key'),
		imageUrl: text('image_url'),
		caption: text('caption'),
		estimatedBudgetLabel: varchar('estimated_budget_label', { length: 80 }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index('landscape_concept_analysis_idx').on(table.analysisId)]
)

export const recommendation = pgTable(
	'recommendation',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		analysisId: uuid('analysis_id')
			.notNull()
			.references(() => yardAnalysis.id, { onDelete: 'cascade' }),
		type: recommendationTypeEnum('type').notNull(),
		title: varchar('title', { length: 180 }).notNull(),
		bucket: varchar('bucket', { length: 80 }).notNull(),
		description: text('description'),
		affiliateUrl: text('affiliate_url'),
		priceCents: integer('price_cents'),
		reasoning: text('reasoning'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index('recommendation_analysis_idx').on(table.analysisId)]
)

export const creditLedgerEntry = pgTable(
	'credit_ledger_entry',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		analysisId: uuid('analysis_id').references(() => yardAnalysis.id, { onDelete: 'set null' }),
		creditPackId: text('credit_pack_id').references(() => creditPack.id, { onDelete: 'set null' }),
		type: creditLedgerTypeEnum('type').notNull(),
		delta: integer('delta').notNull(),
		description: text('description'),
		metadata: jsonb('metadata'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		index('credit_ledger_user_idx').on(table.userId),
		index('credit_ledger_analysis_idx').on(table.analysisId),
	]
)

export const savedConcept = pgTable(
	'saved_concept',
	{
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		landscapeConceptId: uuid('landscape_concept_id')
			.notNull()
			.references(() => landscapeConcept.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.landscapeConceptId] })]
)

export const savedRecommendation = pgTable(
	'saved_recommendation',
	{
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		recommendationId: uuid('recommendation_id')
			.notNull()
			.references(() => recommendation.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.recommendationId] })]
)
