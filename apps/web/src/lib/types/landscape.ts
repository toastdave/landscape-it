export type ViewerKind = 'guest' | 'user'

export type BudgetMode = 'shopping' | 'planning_only'

export type ProjectType =
	| 'front_yard_refresh'
	| 'backyard_makeover'
	| 'patio_upgrade'
	| 'curb_appeal'
	| 'garden_bed_redesign'
	| 'outdoor_living'

export type MaintenanceLevel = 'low' | 'medium' | 'high'

export type SunExposure = 'full_sun' | 'part_shade' | 'full_shade' | 'mixed'

export type TrialStatus = {
	includedGenerations: number
	usedGenerations: number
	remainingGenerations: number
	canStartGeneration: boolean
	signInRequired: boolean
}

export type ViewerPermissions = {
	canCreateProject: boolean
	canCreateGeneration: boolean
	canSave: boolean
	canViewAccount: boolean
	canViewBilling: boolean
	canUseDeveloperTopUp: boolean
	signInRequiredForContinue: boolean
	signInRequiredForSave: boolean
}

export type LandscapeConcept = {
	id: string
	label: string
	caption: string
	assetUrl: string
	accent: string
	isSaved: boolean
}

export type LandscapeRecommendation = {
	id: string
	title: string
	category: string
	merchant: string
	priceLabel: string
	reason: string
	isSaved: boolean
}

export type LandscapeBrief = {
	summary: string
	sunlight: string
	styleDirection: string
	quickWins: string[]
	biggerMoves: string[]
	phases: string[]
}

export type LandscapeGeneration = {
	id: string
	label: string
	status: 'ready' | 'failed'
	createdAtLabel: string
	prompt: string
	budgetLabel: string
	budgetMode: BudgetMode
	imageCount: number
	maintenanceLabel: string
	costLabel: string
	isComplimentary: boolean
	brief: LandscapeBrief
	concepts: LandscapeConcept[]
	recommendations: LandscapeRecommendation[]
}

export type LandscapeProject = {
	id: string
	title: string
	projectTypeLabel: string
	objective: string
	budgetLabel: string
	maintenanceLabel: string
	sunExposureLabel: string
	styleDirection: string
	climateZoneLabel: string
	kidPetLabel: string
	createdAtLabel: string
	lastUpdatedLabel: string
	sourcePhoto: {
		url: string
		alt: string
		caption: string
	}
	activeGenerationId: string
	generations: LandscapeGeneration[]
}

export type WorkspaceLedgerEntry = {
	id: string
	label: string
	detail: string
	amountLabel: string
	dateLabel: string
}

export type CreditPackCard = {
	id: string
	name: string
	credits: number
	priceLabel: string
	detail: string
	sandboxReady: boolean
}

export type LandscapeWorkspaceResponse = {
	viewer: {
		kind: ViewerKind
		label: string
		creditBalance: number
		trial: TrialStatus
		permissions: ViewerPermissions
	}
	pricing: {
		analysisCredits: number
		conceptCredits: number
		creditValueCents: number
		targetMarginPercent: number
	}
	creditPacks: CreditPackCard[]
	ledger: WorkspaceLedgerEntry[]
	projects: LandscapeProject[]
}

export type CreateProjectInput = {
	title: string
	projectType: ProjectType
	objective: string
	budgetLabel: string
	budgetMode: BudgetMode
	maintenanceLevel: MaintenanceLevel
	sunExposure: SunExposure
	styleDirection: string
	climateZone: string
	petFriendly: boolean
	kidFriendly: boolean
	imageCount: number
	photoLabel?: string
}

export type CreateGenerationInput = {
	projectId: string
	prompt: string
	budgetLabel: string
	budgetMode: BudgetMode
	maintenanceLevel: MaintenanceLevel
	styleDirection: string
	imageCount: number
}
