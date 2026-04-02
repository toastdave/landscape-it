import type {
	BudgetMode,
	CreateGenerationInput,
	CreateProjectInput,
	LandscapeBrief,
	LandscapeConcept,
	LandscapeRecommendation,
	MaintenanceLevel,
	ProjectType,
	SunExposure,
} from '$lib/types/landscape'

type EngineGenerationInput =
	| Pick<
			CreateProjectInput,
			| 'title'
			| 'projectType'
			| 'objective'
			| 'budgetLabel'
			| 'budgetMode'
			| 'maintenanceLevel'
			| 'sunExposure'
			| 'styleDirection'
			| 'climateZone'
			| 'petFriendly'
			| 'kidFriendly'
			| 'imageCount'
	  >
	| (CreateGenerationInput & {
			title: string
			projectType: ProjectType
			objective: string
			sunExposure: SunExposure
			climateZone: string
			petFriendly: boolean
			kidFriendly: boolean
	  })

type ConceptSvgInput = {
	title: string
	subtitle: string
	palette: {
		sky: string
		skyAccent: string
		ground: string
		path: string
		plantA: string
		plantB: string
		house: string
	}
	badge: string
}

const projectTypeLabels: Record<ProjectType, string> = {
	front_yard_refresh: 'Front yard refresh',
	backyard_makeover: 'Backyard makeover',
	patio_upgrade: 'Patio upgrade',
	curb_appeal: 'Curb appeal',
	garden_bed_redesign: 'Garden bed redesign',
	outdoor_living: 'Outdoor living',
}

const maintenanceLabels: Record<MaintenanceLevel, string> = {
	low: 'Low maintenance',
	medium: 'Medium maintenance',
	high: 'High maintenance',
}

const sunExposureLabels: Record<SunExposure, string> = {
	full_sun: 'Mostly full sun',
	part_shade: 'Part shade',
	full_shade: 'Mostly shade',
	mixed: 'Mixed exposure',
}

const paletteSet = [
	{
		sky: '#f5dfb8',
		skyAccent: '#ffd26a',
		ground: '#6d8b59',
		path: '#c78b5d',
		plantA: '#4d6848',
		plantB: '#8fa86f',
		house: '#f7efe2',
	},
	{
		sky: '#d8e4d7',
		skyAccent: '#f7c27c',
		ground: '#597551',
		path: '#b29a77',
		plantA: '#395343',
		plantB: '#9bb17f',
		house: '#f8f4ec',
	},
	{
		sky: '#ecd0b8',
		skyAccent: '#f3b35f',
		ground: '#7a8a4a',
		path: '#a97046',
		plantA: '#546a44',
		plantB: '#b8c982',
		house: '#fbf6ef',
	},
]

function createBadge(projectType: ProjectType, index: number) {
	const variantNames = [
		'Balanced plan',
		'Softer planting',
		'Cleaner lines',
		'Lush option',
		'Budget-aware',
	]
	return `${projectTypeLabels[projectType]} - ${variantNames[index % variantNames.length]}`
}

function createStyleSummary(styleDirection: string, maintenanceLevel: MaintenanceLevel) {
	if (styleDirection.trim()) {
		return `${styleDirection.trim()} with a ${maintenanceLabels[maintenanceLevel].toLowerCase()} planting rhythm`
	}

	return maintenanceLevel === 'low'
		? 'A calm, lower-water layout with strong structure and fewer fussy elements'
		: maintenanceLevel === 'high'
			? 'A richer, layered look with more seasonal variety and texture'
			: 'A balanced yard that mixes visual warmth with practical upkeep'
}

function createSunlightNarrative(sunExposure: SunExposure, climateZone: string) {
	const climateLabel = climateZone.trim() ? ` for ${climateZone.trim()}` : ''

	if (sunExposure === 'full_sun') {
		return `The photo reads as a brighter zone with long daytime exposure${climateLabel}, so the concept leans into resilient structure and heat-aware planting.`
	}

	if (sunExposure === 'full_shade') {
		return `The space appears more protected from direct exposure${climateLabel}, so the plan favors layered greens, texture, and fewer sun-dependent focal points.`
	}

	if (sunExposure === 'part_shade') {
		return `The yard seems to shift between filtered light and direct exposure${climateLabel}, which supports flexible plant groupings and softer lounging zones.`
	}

	return `The yard likely has mixed light conditions${climateLabel}, so the plan stays adaptable across brighter and more sheltered edges.`
}

function createPhases(input: EngineGenerationInput) {
	return [
		`Phase 1: tighten the ${projectTypeLabels[input.projectType].toLowerCase()} layout with cleaner edges, pruning, and a simplified focal zone.`,
		`Phase 2: introduce ${maintenanceLabels[input.maintenanceLevel].toLowerCase()} planting layers and stronger material definition near the main circulation path.`,
		`Phase 3: finish with lighting, containers, or seating touches that reinforce the ${createStyleSummary(input.styleDirection, input.maintenanceLevel).toLowerCase()}.`,
	]
}

export function createLandscapeBrief(input: EngineGenerationInput): LandscapeBrief {
	const summary = `This direction reframes ${input.title} as a ${projectTypeLabels[input.projectType].toLowerCase()} with ${maintenanceLabels[input.maintenanceLevel].toLowerCase()} choices, clearer focal points, and a stronger sense of arrival.`

	return {
		summary,
		sunlight: createSunlightNarrative(input.sunExposure, input.climateZone),
		styleDirection: createStyleSummary(input.styleDirection, input.maintenanceLevel),
		quickWins: [
			'Redefine the main edge lines so the yard reads intentional before any major spend.',
			'Use repeating plant masses instead of scattered one-off accents for a calmer result.',
			'Keep one primary focal moment near the entry, patio, or view axis.',
		],
		biggerMoves: [
			'Swap visually noisy zones for fewer, clearer planting or hardscape decisions.',
			'Let the circulation path become part of the design instead of leftover space.',
			input.petFriendly || input.kidFriendly
				? 'Favor durable materials and softer edges in the most active zones.'
				: 'Use a feature planter, seating zone, or lighting layer to give the yard a stronger finish.',
		],
		phases: createPhases(input),
	}
}

export function createRecommendations(input: EngineGenerationInput): LandscapeRecommendation[] {
	const baseRecommendations = [
		{
			id: crypto.randomUUID(),
			title:
				input.maintenanceLevel === 'low'
					? 'Drought-tolerant accent grasses'
					: 'Layered perennial color set',
			category: 'Planting',
			merchant: 'Local nursery',
			priceLabel: input.maintenanceLevel === 'low' ? '$120-$220' : '$180-$320',
			reason:
				input.maintenanceLevel === 'low'
					? 'Keeps the yard feeling intentional with less trimming, watering, and replacement over time.'
					: 'Adds more seasonal movement and softness so the concept feels fuller and more lived-in.',
			isSaved: false,
		},
		{
			id: crypto.randomUUID(),
			title:
				input.projectType === 'patio_upgrade' || input.projectType === 'outdoor_living'
					? 'Warm path and patio lighting kit'
					: 'Low-voltage path lighting starter set',
			category: 'Lighting',
			merchant: 'Build.com',
			priceLabel: '$160-$380',
			reason:
				'Lighting is one of the fastest ways to make the yard feel finished and higher-end without major construction.',
			isSaved: false,
		},
		{
			id: crypto.randomUUID(),
			title:
				input.projectType === 'garden_bed_redesign'
					? 'Mulch and edging refresh bundle'
					: 'Defined gravel or decomposed granite path edge',
			category: 'Hardscape',
			merchant: 'SiteOne',
			priceLabel: '$90-$450',
			reason:
				'Better edge definition helps the whole yard read more designed even before every planting decision is made.',
			isSaved: false,
		},
	]

	if (input.projectType === 'outdoor_living' || input.projectType === 'patio_upgrade') {
		baseRecommendations.push({
			id: crypto.randomUUID(),
			title: 'Outdoor dining or lounge anchor piece',
			category: 'Furniture',
			merchant: 'Article',
			priceLabel: '$350-$900',
			reason: 'One anchor furniture move helps the patio feel intentional instead of temporary.',
			isSaved: false,
		})
	}

	return baseRecommendations
}

function createConceptCaption(input: EngineGenerationInput, index: number, budgetMode: BudgetMode) {
	const emphasis = [
		'leans into layered planting and a softer arrival sequence',
		'pushes cleaner lines with fewer, stronger material moves',
		'balances planting structure with practical circulation upgrades',
		'favors richer greenery and a more immersive outdoor mood',
		'holds the scope tighter for a more budget-conscious upgrade path',
	][index % 5]

	const budgetNote =
		budgetMode === 'planning_only'
			? 'This version stays planning-first without assuming immediate purchases.'
			: `The move set stays anchored around ${input.budgetLabel.toLowerCase()}.`

	return `Option ${String.fromCharCode(65 + index)} ${emphasis}. ${budgetNote}`
}

export function createConceptSvg(input: ConceptSvgInput) {
	return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none">
	<rect width="1200" height="900" fill="${input.palette.sky}" />
	<circle cx="980" cy="150" r="82" fill="${input.palette.skyAccent}" fill-opacity="0.9" />
	<rect y="520" width="1200" height="380" fill="${input.palette.ground}" />
	<path d="M0 620C170 560 320 540 470 560C630 580 820 650 1200 590V900H0V620Z" fill="${input.palette.plantB}" fill-opacity="0.44" />
	<path d="M450 425H840V690H450Z" fill="${input.palette.house}" />
	<path d="M410 445L645 290L885 445H410Z" fill="${input.palette.house}" />
	<rect x="535" y="540" width="120" height="150" rx="10" fill="${input.palette.path}" fill-opacity="0.72" />
	<path d="M592 688C644 760 708 824 812 900H375C468 822 532 758 592 688Z" fill="${input.palette.path}" />
	<circle cx="250" cy="640" r="86" fill="${input.palette.plantA}" />
	<circle cx="168" cy="690" r="58" fill="${input.palette.plantB}" />
	<circle cx="942" cy="652" r="95" fill="${input.palette.plantA}" />
	<circle cx="1036" cy="706" r="54" fill="${input.palette.plantB}" />
	<rect x="72" y="70" width="358" height="84" rx="42" fill="#FFFCF5" fill-opacity="0.9" />
	<text x="112" y="121" fill="#173323" font-size="34" font-family="Arial, sans-serif">${input.badge}</text>
	<text x="72" y="794" fill="#173323" font-size="58" font-family="Arial, sans-serif">${input.title}</text>
	<text x="72" y="846" fill="#264434" font-size="28" font-family="Arial, sans-serif">${input.subtitle}</text>
</svg>`.trim()
}

export function createConceptDrafts(input: EngineGenerationInput) {
	return Array.from({ length: input.imageCount }, (_, index) => {
		const palette = paletteSet[index % paletteSet.length]
		const label = `Option ${String.fromCharCode(65 + index)}`
		const badge = createBadge(input.projectType, index)
		const caption = createConceptCaption(input, index, input.budgetMode)

		return {
			label,
			caption,
			accent: `from-[${palette.sky}] via-[${palette.path}] to-[${palette.ground}]`,
			svg: createConceptSvg({
				title: label,
				subtitle: projectTypeLabels[input.projectType],
				palette,
				badge,
			}),
		}
	})
}

export function getProjectTypeLabel(projectType: ProjectType) {
	return projectTypeLabels[projectType]
}

export function getMaintenanceLabel(level: MaintenanceLevel) {
	return maintenanceLabels[level]
}

export function getSunExposureLabel(exposure: SunExposure) {
	return sunExposureLabels[exposure]
}
