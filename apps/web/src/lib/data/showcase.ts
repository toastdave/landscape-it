export const workflowSteps = [
	{
		eyebrow: '1. Capture',
		title: 'Upload the yard you want to rethink',
		body: 'Front yard, backyard, side yard, patio, or one stubborn problem zone. Phone-first capture stays central to the product.',
	},
	{
		eyebrow: '2. Direct',
		title: 'Describe the feeling, budget, and upkeep you want',
		body: 'Users should be able to say “more curb appeal”, “lower maintenance”, or “make this patio feel finished” without needing design vocabulary.',
	},
	{
		eyebrow: '3. Visualize',
		title: 'See concepts plus a usable outdoor brief',
		body: 'The experience combines concept imagery, planting ideas, hardscape suggestions, and a phased improvement plan.',
	},
]

export const sampleConcepts = [
	{
		title: 'Soft modern curb appeal',
		caption:
			'Layered grasses, warm path lighting, and a cleaner entry sequence that still feels approachable.',
		meta: 'Front yard refresh',
		gradient: 'from-[#f3d0a1] via-[#d8b379] to-[#55725b]',
	},
	{
		title: 'Drought-aware backyard retreat',
		caption:
			'A shaded seating edge, gravel transitions, and fewer thirsty plantings without losing softness.',
		meta: 'Backyard makeover',
		gradient: 'from-[#dcc6ac] via-[#91a477] to-[#395343]',
	},
	{
		title: 'Patio that feels intentionally finished',
		caption:
			'Defined dining and lounge zones, planters with height, and materials that connect the house to the yard.',
		meta: 'Outdoor living',
		gradient: 'from-[#e8c49b] via-[#b4885e] to-[#4a5c45]',
	},
]

export const futurePillars = [
	'Guest-first upload flow with one complimentary concept before sign-in.',
	'AI yard analysis that identifies sunlight assumptions, focal points, privacy opportunities, and maintenance tradeoffs.',
	'Configurable concept generation with style, budget, maintenance, pet-friendliness, and climate-aware inputs.',
	'Polar-backed credit packs for repeat usage once the first free experience proves value.',
]

export const studioSnapshot = {
	viewer: {
		kind: 'guest',
		name: 'Guest homeowner',
		creditBalance: 1,
	},
	project: {
		title: 'Elm Street front yard',
		type: 'Curb appeal refresh',
		objective: 'Warm up the entry, reduce patchy lawn maintenance, and add year-round structure.',
		budget: '$4k-$8k',
		maintenance: 'Low to medium',
	},
	brief: {
		sunlight: 'Mixed sun with harsh late-afternoon exposure near the driveway',
		style: 'California casual meets clean cottage lines',
		phases: [
			'Phase 1: clean edge lines, entry path lighting, and mulch reset',
			'Phase 2: swap lawn-heavy zones for layered planting beds and groundcover',
			'Phase 3: add focal planter moments and porch-side seating balance',
		],
	},
	recommendations: [
		'Plant palette: lavender, dwarf olive, lomandra, salvia, and evergreen structure shrubs',
		'Hardscape: decomposed granite side path and wider front walk edge definition',
		'Lighting: low bollards near the approach plus warm uplighting at the entry tree',
	],
}

export const accountSnapshot = {
	profile: {
		name: 'Robin homeowner',
		email: 'robin@example.com',
		creditBalance: 42,
		projectCount: 3,
		savedConceptCount: 7,
		savedRecommendationCount: 11,
	},
	savedConcepts: [
		{
			label: 'Driveway soften-up',
			caption:
				'Cleaner planting rhythm with room for a lower-water border and stronger arrival moment.',
			project: 'Elm Street front yard',
		},
		{
			label: 'Patio dining frame',
			caption:
				'Pergola-adjacent planters and integrated string-light anchors to make the patio feel complete.',
			project: 'Cedar backyard',
		},
	],
	activity: [
		{
			label: 'Complimentary first concept',
			amount: '+0',
			date: 'Today',
		},
		{
			label: 'Backyard concept pack',
			amount: '-14',
			date: 'Yesterday',
		},
	],
}

export const billingSnapshot = {
	creditBalance: 42,
	creditPacks: [
		{
			id: 'starter',
			name: 'Starter Pack',
			credits: 20,
			priceLabel: '$24',
			detail: 'Best for testing a couple of yard directions after the complimentary first run.',
		},
		{
			id: 'curb-appeal',
			name: 'Curb Appeal Pack',
			credits: 60,
			priceLabel: '$64.80',
			detail:
				'Built for front-yard refinements, alternate concepts, and a few focused regenerations.',
		},
		{
			id: 'backyard-vision',
			name: 'Backyard Vision Pack',
			credits: 150,
			priceLabel: '$153',
			detail: 'For deeper backyard exploration, multi-zone planning, and more visual iterations.',
		},
	],
	ledger: [
		{
			label: 'Seed credit grant',
			detail: 'Starter sandbox balance for internal product verification.',
			amount: '+50',
		},
		{
			label: 'Front yard concept batch',
			detail: 'Analysis plus three concepts for Elm Street front yard.',
			amount: '-8',
		},
	],
	pricing: {
		analysisCredits: 7,
		conceptCredits: 4,
		targetMarginPercent: 65,
	},
}

export const prdIndex = [
	{
		path: 'docs/prds/00-product-vision.md',
		title: 'Product vision',
		description: 'Promise, audience, monetization, and non-goals for a consumer landscaping app.',
	},
	{
		path: 'docs/prds/01-platform-foundation.md',
		title: 'Platform foundation',
		description:
			'Locked stack, workspace layout, env setup, and local infrastructure expectations.',
	},
	{
		path: 'docs/prds/02-auth-and-accounts.md',
		title: 'Auth and accounts',
		description: 'Guest-first usage, account conversion, and saved history behavior.',
	},
	{
		path: 'docs/prds/03-yard-projects-and-uploads.md',
		title: 'Yard projects and uploads',
		description: 'How users create projects, upload photos, and structure outdoor problem areas.',
	},
	{
		path: 'docs/prds/04-yard-analysis-and-style-briefs.md',
		title: 'Yard analysis and style briefs',
		description: 'AI interpretation of the yard before generation begins.',
	},
	{
		path: 'docs/prds/05-landscape-concept-generation.md',
		title: 'Landscape concept generation',
		description: 'Image generation, regeneration, comparison, and concept presentation.',
	},
	{
		path: 'docs/prds/06-credits-and-polar-billing.md',
		title: 'Credits and Polar billing',
		description: 'Usage pricing, transparent cost math, and checkout/webhook flow.',
	},
	{
		path: 'docs/prds/07-history-saves-and-regeneration.md',
		title: 'History, saves, and regeneration',
		description: 'How projects, concepts, and saved items persist over time.',
	},
	{
		path: 'docs/prds/08-trust-safety-and-image-privacy.md',
		title: 'Trust, safety, and image privacy',
		description: 'Consumer safeguards for uploads, outputs, and billing trust.',
	},
	{
		path: 'docs/prds/implementation-roadmap.md',
		title: 'Implementation roadmap',
		description: 'Delivery order across foundation, workflow, generation, and billing.',
	},
]
