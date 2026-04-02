export type CreditPricingConfig = {
	analysisModelCostUsd: number
	conceptImageCostUsd: number
	targetMarginPercent: number
	creditValueCents: number
}

export type CreditPricingSummary = CreditPricingConfig & {
	analysisCredits: number
	conceptCredits: number
}

export type GenerationCreditBreakdown = {
	baseCredits: number
	imageCredits: number
	totalCredits: number
	isComplimentary: boolean
}

type CreditPackBlueprint = {
	id: string
	slug: string
	name: string
	credits: number
	discountPercent: number
}

function readString(name: string) {
	const raw = process.env[name]?.trim()
	return raw ? raw : null
}

const defaultCreditPackBlueprints: CreditPackBlueprint[] = [
	{
		id: 'starter',
		slug: 'starter',
		name: 'Starter Pack',
		credits: 20,
		discountPercent: 0,
	},
	{
		id: 'curb-appeal',
		slug: 'curb-appeal',
		name: 'Curb Appeal Pack',
		credits: 60,
		discountPercent: 10,
	},
	{
		id: 'backyard-vision',
		slug: 'backyard-vision',
		name: 'Backyard Vision Pack',
		credits: 150,
		discountPercent: 15,
	},
]

function readNumber(name: string, fallback: number) {
	const raw = process.env[name]

	if (!raw) {
		return fallback
	}

	const parsed = Number(raw)
	return Number.isFinite(parsed) ? parsed : fallback
}

function clampMarginPercent(value: number) {
	return Math.min(95, Math.max(0, value))
}

function applyTargetMargin(costUsd: number, targetMarginPercent: number) {
	const denominator = Math.max(0.05, 1 - targetMarginPercent / 100)
	return costUsd / denominator
}

function creditsFromUsd(costUsd: number, creditValueCents: number) {
	const normalizedCreditValue = Math.max(1, creditValueCents)
	return Math.max(1, Math.ceil((costUsd * 100) / normalizedCreditValue))
}

export function getCreditPricingConfig(): CreditPricingConfig {
	return {
		analysisModelCostUsd: readNumber('LANDSCAPE_ANALYSIS_MODEL_COST_USD', 0.22),
		conceptImageCostUsd: readNumber('LANDSCAPE_CONCEPT_MODEL_COST_USD', 0.14),
		targetMarginPercent: clampMarginPercent(readNumber('LANDSCAPE_TARGET_MARGIN_PERCENT', 65)),
		creditValueCents: Math.max(1, Math.round(readNumber('LANDSCAPE_CREDIT_VALUE_CENTS', 10))),
	}
}

export function getCreditPricingSummary(): CreditPricingSummary {
	const config = getCreditPricingConfig()

	return {
		...config,
		analysisCredits: creditsFromUsd(
			applyTargetMargin(config.analysisModelCostUsd, config.targetMarginPercent),
			config.creditValueCents
		),
		conceptCredits: creditsFromUsd(
			applyTargetMargin(config.conceptImageCostUsd, config.targetMarginPercent),
			config.creditValueCents
		),
	}
}

export function calculateGenerationCredits(input: {
	budgetMode: 'shopping' | 'planning_only'
	imageCount: number
	isComplimentary?: boolean
}): GenerationCreditBreakdown {
	if (input.budgetMode === 'planning_only' || input.isComplimentary) {
		return {
			baseCredits: 0,
			imageCredits: 0,
			totalCredits: 0,
			isComplimentary: input.isComplimentary ?? false,
		}
	}

	const pricing = getCreditPricingSummary()
	const normalizedImageCount = Math.max(0, Math.floor(input.imageCount))
	const imageCredits = normalizedImageCount * pricing.conceptCredits

	return {
		baseCredits: pricing.analysisCredits,
		imageCredits,
		totalCredits: pricing.analysisCredits + imageCredits,
		isComplimentary: false,
	}
}

export function buildCreditPackCatalog() {
	const pricing = getCreditPricingSummary()

	return defaultCreditPackBlueprints.map((pack) => ({
		id: pack.id,
		slug: pack.slug,
		name: pack.name,
		credits: pack.credits,
		polarProductId: getPolarProductIdByPackSlug(pack.slug),
		priceCents: Math.max(
			pricing.creditValueCents,
			Math.round(pack.credits * pricing.creditValueCents * (1 - pack.discountPercent / 100))
		),
	}))
}

export function getPolarProductIdByPackSlug(slug: string) {
	const keyBySlug: Record<string, string> = {
		starter: 'POLAR_PRODUCT_STARTER',
		'curb-appeal': 'POLAR_PRODUCT_CURB_APPEAL',
		'backyard-vision': 'POLAR_PRODUCT_BACKYARD_VISION',
	}

	const envKey = keyBySlug[slug]
	return envKey ? readString(envKey) : null
}
