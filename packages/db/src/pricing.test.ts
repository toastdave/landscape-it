import { afterEach, describe, expect, test } from 'bun:test'
import {
	buildCreditPackCatalog,
	calculateGenerationCredits,
	getCreditPricingSummary,
	getPolarProductIdByPackSlug,
} from './pricing'

const envKeys = [
	'LANDSCAPE_ANALYSIS_MODEL_COST_USD',
	'LANDSCAPE_CONCEPT_MODEL_COST_USD',
	'LANDSCAPE_TARGET_MARGIN_PERCENT',
	'LANDSCAPE_CREDIT_VALUE_CENTS',
	'POLAR_PRODUCT_STARTER',
	'POLAR_PRODUCT_CURB_APPEAL',
	'POLAR_PRODUCT_BACKYARD_VISION',
] as const

const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))

afterEach(() => {
	for (const key of envKeys) {
		const originalValue = originalEnv[key]

		if (originalValue === undefined) {
			delete process.env[key]
		} else {
			process.env[key] = originalValue
		}
	}
})

describe('pricing', () => {
	test('derives generation credits from model costs and target margin', () => {
		process.env.LANDSCAPE_ANALYSIS_MODEL_COST_USD = '0.25'
		process.env.LANDSCAPE_CONCEPT_MODEL_COST_USD = '0.12'
		process.env.LANDSCAPE_TARGET_MARGIN_PERCENT = '50'
		process.env.LANDSCAPE_CREDIT_VALUE_CENTS = '10'

		const pricing = getCreditPricingSummary()

		expect(pricing.analysisCredits).toBe(5)
		expect(pricing.conceptCredits).toBe(3)

		expect(
			calculateGenerationCredits({
				budgetMode: 'shopping',
				imageCount: 3,
			})
		).toEqual({
			baseCredits: 5,
			imageCredits: 9,
			totalCredits: 14,
			isComplimentary: false,
		})
	})

	test('returns no charge for planning-only or complimentary generations', () => {
		expect(
			calculateGenerationCredits({
				budgetMode: 'planning_only',
				imageCount: 5,
			})
		).toEqual({
			baseCredits: 0,
			imageCredits: 0,
			totalCredits: 0,
			isComplimentary: false,
		})

		expect(
			calculateGenerationCredits({
				budgetMode: 'shopping',
				imageCount: 5,
				isComplimentary: true,
			})
		).toEqual({
			baseCredits: 0,
			imageCredits: 0,
			totalCredits: 0,
			isComplimentary: true,
		})
	})

	test('prices seeded credit packs from the configured credit value', () => {
		process.env.LANDSCAPE_CREDIT_VALUE_CENTS = '12'
		process.env.POLAR_PRODUCT_STARTER = 'prod_starter'

		const packs = buildCreditPackCatalog()

		expect(packs).toEqual([
			{
				id: 'starter',
				slug: 'starter',
				name: 'Starter Pack',
				credits: 20,
				polarProductId: 'prod_starter',
				priceCents: 240,
			},
			{
				id: 'curb-appeal',
				slug: 'curb-appeal',
				name: 'Curb Appeal Pack',
				credits: 60,
				polarProductId: null,
				priceCents: 648,
			},
			{
				id: 'backyard-vision',
				slug: 'backyard-vision',
				name: 'Backyard Vision Pack',
				credits: 150,
				polarProductId: null,
				priceCents: 1530,
			},
		])
	})

	test('reads Polar product mappings by pack slug', () => {
		process.env.POLAR_PRODUCT_CURB_APPEAL = 'prod_curb'

		expect(getPolarProductIdByPackSlug('curb-appeal')).toBe('prod_curb')
		expect(getPolarProductIdByPackSlug('starter')).toBeNull()
		expect(getPolarProductIdByPackSlug('missing')).toBeNull()
	})
})
