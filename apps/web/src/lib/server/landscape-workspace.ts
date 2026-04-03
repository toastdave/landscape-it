import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import type {
	CreateGenerationInput,
	CreateProjectInput,
	CreditPackCard,
	LandscapeConcept,
	LandscapeGeneration,
	LandscapeProject,
	LandscapeRecommendation,
	LandscapeWorkspaceResponse,
	ProjectType,
	TrialStatus,
	ViewerPermissions,
	WorkspaceLedgerEntry,
} from '$lib/types/landscape'
import {
	buildCreditPackCatalog,
	calculateGenerationCredits,
	getCreditPricingSummary,
} from '@landscape_it/db'
import {
	createConceptDrafts,
	createLandscapeBrief,
	createRecommendations,
	getMaintenanceLabel,
	getProjectTypeLabel,
	getSunExposureLabel,
} from './landscape-engine'
import {
	buildMediaUrl,
	createStorageKey,
	deleteStoredAssets,
	storeGeneratedSvg,
	storeUploadedPhoto,
} from './landscape-storage'
import { isProduction } from './runtime'
import { type ViewerSession, buildGuestViewerId } from './viewer-session'

const INCLUDED_GUEST_GENERATIONS = 1
const DEFAULT_SANDBOX_CREDITS = 36
const INITIAL_GRANT_ID = 'workspace-initial-grant'
const demoCreditAmount = 24

type StoredLedgerEntry = {
	id: string
	label: string
	detail: string
	delta: number
	createdAt: string
}

type StoredRecommendation = LandscapeRecommendation

type StoredConcept = {
	id: string
	label: string
	caption: string
	assetKey: string
	isSaved: boolean
	accent: string
}

type StoredGeneration = {
	id: string
	label: string
	status: 'ready' | 'failed'
	createdAt: string
	prompt: string
	budgetLabel: string
	budgetMode: CreateProjectInput['budgetMode']
	imageCount: number
	maintenanceLevel: CreateProjectInput['maintenanceLevel']
	costCredits: number
	isComplimentary: boolean
	brief: ReturnType<typeof createLandscapeBrief>
	concepts: StoredConcept[]
	recommendations: StoredRecommendation[]
}

type StoredProject = {
	id: string
	title: string
	projectType: ProjectType
	objective: string
	budgetLabel: string
	budgetMode: CreateProjectInput['budgetMode']
	maintenanceLevel: CreateProjectInput['maintenanceLevel']
	sunExposure: CreateProjectInput['sunExposure']
	styleDirection: string
	climateZone: string
	petFriendly: boolean
	kidFriendly: boolean
	sourcePhoto: {
		storageKey: string
		caption: string
		alt: string
	}
	activeGenerationId: string
	createdAt: string
	updatedAt: string
	generations: StoredGeneration[]
}

type StoredWorkspace = {
	version: 1
	viewerId: string
	viewerKind: ViewerSession['kind']
	createdAt: string
	updatedAt: string
	creditBalance: number
	usedComplimentaryGenerations: number
	ledger: StoredLedgerEntry[]
	projects: StoredProject[]
}

const dataRoot = new URL('../../../../../.data/', import.meta.url)
const workspaceRoot = new URL('./workspaces/', dataRoot)

function normalizeViewerId(viewerId: string) {
	return viewerId.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'viewer'
}

function workspaceFileUrl(viewer: ViewerSession) {
	return new URL(`./${normalizeViewerId(viewer.viewerId)}.json`, workspaceRoot)
}

function formatCurrency(cents: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
	}).format(cents / 100)
}

function formatDateLabel(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
	}).format(new Date(value))
}

function getTrialStatus(usedGenerations: number): TrialStatus {
	const normalizedUsedGenerations = Math.max(0, Math.floor(usedGenerations))
	const remainingGenerations = Math.max(0, INCLUDED_GUEST_GENERATIONS - normalizedUsedGenerations)

	return {
		includedGenerations: INCLUDED_GUEST_GENERATIONS,
		usedGenerations: normalizedUsedGenerations,
		remainingGenerations,
		canStartGeneration: remainingGenerations > 0,
		signInRequired: remainingGenerations === 0,
	}
}

async function ensureWorkspaceRoot() {
	await mkdir(workspaceRoot, { recursive: true })
}

function createInitialWorkspace(viewer: ViewerSession): StoredWorkspace {
	const now = new Date().toISOString()

	return {
		version: 1,
		viewerId: viewer.viewerId,
		viewerKind: viewer.kind,
		createdAt: now,
		updatedAt: now,
		creditBalance: DEFAULT_SANDBOX_CREDITS,
		usedComplimentaryGenerations: 0,
		ledger: [
			{
				id: INITIAL_GRANT_ID,
				label: 'Sandbox credit grant',
				detail:
					'Local development balance so the guest workflow stays testable without live billing.',
				delta: DEFAULT_SANDBOX_CREDITS,
				createdAt: now,
			},
		],
		projects: [],
	}
}

async function readWorkspace(viewer: ViewerSession) {
	await ensureWorkspaceRoot()

	try {
		const raw = await readFile(workspaceFileUrl(viewer), 'utf8')
		return JSON.parse(raw) as StoredWorkspace
	} catch {
		const workspace = createInitialWorkspace(viewer)
		await writeWorkspace(viewer, workspace)
		return workspace
	}
}

async function readExistingWorkspace(viewer: ViewerSession) {
	await ensureWorkspaceRoot()

	try {
		const raw = await readFile(workspaceFileUrl(viewer), 'utf8')
		return JSON.parse(raw) as StoredWorkspace
	} catch {
		return null
	}
}

async function writeWorkspace(viewer: ViewerSession, workspace: StoredWorkspace) {
	workspace.updatedAt = new Date().toISOString()
	await ensureWorkspaceRoot()
	await writeFile(workspaceFileUrl(viewer), JSON.stringify(workspace, null, 2))
}

function createLedgerEntry(
	input: Pick<StoredLedgerEntry, 'label' | 'detail' | 'delta'>
): StoredLedgerEntry {
	return {
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		...input,
	}
}

function createCreditPackCards(): CreditPackCard[] {
	return buildCreditPackCatalog().map((pack) => ({
		id: pack.id,
		name: pack.name,
		credits: pack.credits,
		priceLabel: formatCurrency(pack.priceCents),
		detail:
			pack.slug === 'starter'
				? 'Good for trying a couple more yard directions after the complimentary first run.'
				: pack.slug === 'curb-appeal'
					? 'Best for front-yard refinement, alternates, and focused regenerate passes.'
					: 'Built for deeper backyard exploration and multi-zone concept work.',
		sandboxReady: Boolean(pack.polarProductId),
	}))
}

function buildViewerPermissions(
	viewer: ViewerSession,
	workspace: StoredWorkspace
): ViewerPermissions {
	const guestProjectLimitReached = viewer.kind === 'guest' && workspace.projects.length >= 1
	const complimentaryRunUsed =
		viewer.kind === 'guest' && workspace.usedComplimentaryGenerations >= INCLUDED_GUEST_GENERATIONS

	if (viewer.kind === 'user') {
		return {
			canCreateProject: true,
			canCreateGeneration: true,
			canSave: true,
			canViewAccount: true,
			canViewBilling: true,
			canUseDeveloperTopUp: !isProduction(),
			signInRequiredForContinue: false,
			signInRequiredForSave: false,
		}
	}

	return {
		canCreateProject: !guestProjectLimitReached && !complimentaryRunUsed,
		canCreateGeneration: false,
		canSave: false,
		canViewAccount: false,
		canViewBilling: false,
		canUseDeveloperTopUp: false,
		signInRequiredForContinue: guestProjectLimitReached || complimentaryRunUsed,
		signInRequiredForSave: true,
	}
}

function collectWorkspaceAssetKeys(workspace: StoredWorkspace) {
	return workspace.projects.flatMap((project) => [
		project.sourcePhoto.storageKey,
		...project.generations.flatMap((generation) =>
			generation.concepts.map((concept) => concept.assetKey)
		),
	])
}

function isInitialWorkspace(workspace: StoredWorkspace) {
	return (
		workspace.projects.length === 0 &&
		workspace.ledger.length === 1 &&
		workspace.ledger[0]?.id === INITIAL_GRANT_ID
	)
}

function toLedgerResponse(entries: StoredLedgerEntry[]): WorkspaceLedgerEntry[] {
	return [...entries].reverse().map((entry) => ({
		id: entry.id,
		label: entry.label,
		detail: entry.detail,
		amountLabel: `${entry.delta >= 0 ? '+' : ''}${entry.delta}`,
		dateLabel: formatDateLabel(entry.createdAt),
	}))
}

function toConceptResponse(concept: StoredConcept): LandscapeConcept {
	return {
		id: concept.id,
		label: concept.label,
		caption: concept.caption,
		assetUrl: buildMediaUrl(concept.assetKey),
		accent: concept.accent,
		isSaved: concept.isSaved,
	}
}

function toGenerationResponse(generation: StoredGeneration): LandscapeGeneration {
	return {
		id: generation.id,
		label: generation.label,
		status: generation.status,
		createdAtLabel: formatDateLabel(generation.createdAt),
		prompt: generation.prompt,
		budgetLabel: generation.budgetLabel,
		budgetMode: generation.budgetMode,
		imageCount: generation.imageCount,
		maintenanceLabel: getMaintenanceLabel(generation.maintenanceLevel),
		costLabel: generation.isComplimentary
			? 'Complimentary first run'
			: generation.costCredits === 0
				? 'Planning-only'
				: `${generation.costCredits} credits`,
		isComplimentary: generation.isComplimentary,
		brief: generation.brief,
		concepts: generation.concepts.map(toConceptResponse),
		recommendations: generation.recommendations,
	}
}

function toProjectResponse(project: StoredProject): LandscapeProject {
	return {
		id: project.id,
		title: project.title,
		projectTypeLabel: getProjectTypeLabel(project.projectType),
		objective: project.objective,
		budgetLabel: project.budgetLabel,
		maintenanceLabel: getMaintenanceLabel(project.maintenanceLevel),
		sunExposureLabel: getSunExposureLabel(project.sunExposure),
		styleDirection: project.styleDirection,
		climateZoneLabel: project.climateZone.trim() || 'Climate not specified',
		kidPetLabel:
			project.kidFriendly && project.petFriendly
				? 'Kid and pet friendly'
				: project.kidFriendly
					? 'Kid friendly'
					: project.petFriendly
						? 'Pet friendly'
						: 'No kid or pet filter set',
		createdAtLabel: formatDateLabel(project.createdAt),
		lastUpdatedLabel: formatDateLabel(project.updatedAt),
		sourcePhoto: {
			url: buildMediaUrl(project.sourcePhoto.storageKey),
			alt: project.sourcePhoto.alt,
			caption: project.sourcePhoto.caption,
		},
		activeGenerationId: project.activeGenerationId,
		generations: [...project.generations].reverse().map(toGenerationResponse),
	}
}

async function createStoredGeneration(
	viewer: ViewerSession,
	project: StoredProject,
	workspace: StoredWorkspace,
	input: Omit<CreateGenerationInput, 'projectId'>
) {
	const isComplimentary =
		viewer.kind === 'guest' && workspace.usedComplimentaryGenerations < INCLUDED_GUEST_GENERATIONS
	const cost = calculateGenerationCredits({
		budgetMode: input.budgetMode,
		imageCount: input.imageCount,
		isComplimentary,
	})

	if (cost.totalCredits > workspace.creditBalance) {
		throw new Error('Not enough sandbox credits to generate that many concepts yet.')
	}

	const generationId = crypto.randomUUID()
	const brief = createLandscapeBrief({
		title: project.title,
		projectType: project.projectType,
		objective: project.objective,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		sunExposure: project.sunExposure,
		styleDirection: input.styleDirection,
		climateZone: project.climateZone,
		petFriendly: project.petFriendly,
		kidFriendly: project.kidFriendly,
		imageCount: input.imageCount,
		prompt: input.prompt,
	})

	const conceptDrafts = createConceptDrafts({
		title: project.title,
		projectType: project.projectType,
		objective: project.objective,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		sunExposure: project.sunExposure,
		styleDirection: input.styleDirection,
		climateZone: project.climateZone,
		petFriendly: project.petFriendly,
		kidFriendly: project.kidFriendly,
		imageCount: input.imageCount,
		prompt: input.prompt,
	})

	const concepts: StoredConcept[] = []

	for (const [index, draft] of conceptDrafts.entries()) {
		const assetKey = createStorageKey({
			viewerId: viewer.viewerId,
			projectId: project.id,
			kind: 'concept',
			fileName: `${generationId}-${draft.label}.svg`,
			index: index + 1,
		})

		await storeGeneratedSvg(assetKey, draft.svg)

		concepts.push({
			id: crypto.randomUUID(),
			label: draft.label,
			caption: draft.caption,
			assetKey,
			isSaved: false,
			accent: draft.accent,
		})
	}

	const recommendations = createRecommendations({
		title: project.title,
		projectType: project.projectType,
		objective: project.objective,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		sunExposure: project.sunExposure,
		styleDirection: input.styleDirection,
		climateZone: project.climateZone,
		petFriendly: project.petFriendly,
		kidFriendly: project.kidFriendly,
		imageCount: input.imageCount,
		prompt: input.prompt,
	})

	const generation: StoredGeneration = {
		id: generationId,
		label: `Concept pass ${project.generations.length + 1}`,
		status: 'ready',
		createdAt: new Date().toISOString(),
		prompt: input.prompt,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		imageCount: input.imageCount,
		maintenanceLevel: input.maintenanceLevel,
		costCredits: cost.totalCredits,
		isComplimentary,
		brief,
		concepts,
		recommendations,
	}

	workspace.creditBalance -= cost.totalCredits

	if (isComplimentary) {
		workspace.usedComplimentaryGenerations += 1
		workspace.ledger.push(
			createLedgerEntry({
				label: 'Complimentary first concept',
				detail: `${project.title} used the included guest run.`,
				delta: 0,
			})
		)
	} else {
		workspace.ledger.push(
			createLedgerEntry({
				label: `${getProjectTypeLabel(project.projectType)} concepts`,
				detail: `${input.imageCount} concept${input.imageCount === 1 ? '' : 's'} for ${project.title}.`,
				delta: -cost.totalCredits,
			})
		)
	}

	return generation
}

export async function getLandscapeWorkspaceData(
	viewer: ViewerSession
): Promise<LandscapeWorkspaceResponse> {
	const workspace = await readWorkspace(viewer)
	const pricing = getCreditPricingSummary()
	const permissions = buildViewerPermissions(viewer, workspace)

	return {
		viewer: {
			kind: viewer.kind,
			label: viewer.label,
			creditBalance: workspace.creditBalance,
			trial: getTrialStatus(workspace.usedComplimentaryGenerations),
			permissions,
		},
		pricing: {
			analysisCredits: pricing.analysisCredits,
			conceptCredits: pricing.conceptCredits,
			creditValueCents: pricing.creditValueCents,
			targetMarginPercent: pricing.targetMarginPercent,
		},
		creditPacks: createCreditPackCards(),
		ledger: toLedgerResponse(workspace.ledger),
		projects: [...workspace.projects].reverse().map(toProjectResponse),
	}
}

export async function getViewerWorkspacePermissions(viewer: ViewerSession) {
	const workspace = await readWorkspace(viewer)
	return buildViewerPermissions(viewer, workspace)
}

export async function migrateGuestWorkspaceToUser(input: {
	guestId: string
	userId: string
}) {
	const guestViewer: ViewerSession = {
		kind: 'guest',
		viewerId: buildGuestViewerId(input.guestId),
		guestId: input.guestId,
		label: 'Guest homeowner',
	}
	const userViewer: ViewerSession = {
		kind: 'user',
		viewerId: input.userId,
		label: 'Signed-in homeowner',
		email: '',
		name: 'Signed-in homeowner',
	}

	const guestWorkspace = await readExistingWorkspace(guestViewer)

	if (!guestWorkspace) {
		return false
	}

	const existingUserWorkspace = await readWorkspace(userViewer)
	const now = new Date().toISOString()

	if (isInitialWorkspace(existingUserWorkspace)) {
		await writeWorkspace(userViewer, {
			...guestWorkspace,
			viewerId: input.userId,
			viewerKind: 'user',
			updatedAt: now,
		})
		await rm(workspaceFileUrl(guestViewer), { force: true })
		return true
	}

	const mergedProjects = [
		...guestWorkspace.projects,
		...existingUserWorkspace.projects.filter(
			(project) => !guestWorkspace.projects.some((guestProject) => guestProject.id === project.id)
		),
	]
	const mergedLedger = [
		...guestWorkspace.ledger,
		...existingUserWorkspace.ledger.filter(
			(entry) =>
				entry.id !== INITIAL_GRANT_ID &&
				!guestWorkspace.ledger.some((guestEntry) => guestEntry.id === entry.id)
		),
	]

	await writeWorkspace(userViewer, {
		...existingUserWorkspace,
		viewerId: input.userId,
		viewerKind: 'user',
		creditBalance: Math.max(existingUserWorkspace.creditBalance, guestWorkspace.creditBalance),
		usedComplimentaryGenerations: Math.max(
			existingUserWorkspace.usedComplimentaryGenerations,
			guestWorkspace.usedComplimentaryGenerations
		),
		projects: mergedProjects,
		ledger: mergedLedger,
		updatedAt: now,
	})

	await rm(workspaceFileUrl(guestViewer), { force: true })
	return true
}

export async function uploadAndCreateProject(
	viewer: ViewerSession,
	input: CreateProjectInput,
	file: File
) {
	const workspace = await readWorkspace(viewer)
	const now = new Date().toISOString()
	const projectId = crypto.randomUUID()
	const photoKey = createStorageKey({
		viewerId: viewer.viewerId,
		projectId,
		kind: 'source',
		fileName: file.name || 'yard-photo',
	})

	await storeUploadedPhoto(photoKey, file)

	const project: StoredProject = {
		id: projectId,
		title: input.title,
		projectType: input.projectType,
		objective: input.objective,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		sunExposure: input.sunExposure,
		styleDirection: input.styleDirection,
		climateZone: input.climateZone,
		petFriendly: input.petFriendly,
		kidFriendly: input.kidFriendly,
		sourcePhoto: {
			storageKey: photoKey,
			caption: input.photoLabel?.trim() || file.name || 'Uploaded yard photo',
			alt: `${input.title} source photo`,
		},
		activeGenerationId: '',
		createdAt: now,
		updatedAt: now,
		generations: [],
	}

	const generation = await createStoredGeneration(viewer, project, workspace, {
		prompt: input.objective,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		styleDirection: input.styleDirection,
		imageCount: input.imageCount,
	})

	project.generations.push(generation)
	project.activeGenerationId = generation.id
	workspace.projects.push(project)
	await writeWorkspace(viewer, workspace)

	return {
		projectId: project.id,
		generationId: generation.id,
	}
}

export async function createGeneration(viewer: ViewerSession, input: CreateGenerationInput) {
	const workspace = await readWorkspace(viewer)
	const project = workspace.projects.find((entry) => entry.id === input.projectId)

	if (!project) {
		throw new Error('Project not found')
	}

	const generation = await createStoredGeneration(viewer, project, workspace, {
		prompt: input.prompt,
		budgetLabel: input.budgetLabel,
		budgetMode: input.budgetMode,
		maintenanceLevel: input.maintenanceLevel,
		styleDirection: input.styleDirection,
		imageCount: input.imageCount,
	})

	project.generations.push(generation)
	project.activeGenerationId = generation.id
	project.updatedAt = new Date().toISOString()
	await writeWorkspace(viewer, workspace)

	return {
		projectId: project.id,
		generationId: generation.id,
	}
}

export async function toggleSavedConcept(
	viewer: ViewerSession,
	input: { projectId: string; generationId: string; conceptId: string }
) {
	const workspace = await readWorkspace(viewer)
	const project = workspace.projects.find((entry) => entry.id === input.projectId)
	const generation = project?.generations.find((entry) => entry.id === input.generationId)
	const concept = generation?.concepts.find((entry) => entry.id === input.conceptId)

	if (!project || !generation || !concept) {
		throw new Error('Concept not found')
	}

	concept.isSaved = !concept.isSaved
	project.updatedAt = new Date().toISOString()
	await writeWorkspace(viewer, workspace)
}

export async function toggleSavedRecommendation(
	viewer: ViewerSession,
	input: { projectId: string; generationId: string; recommendationId: string }
) {
	const workspace = await readWorkspace(viewer)
	const project = workspace.projects.find((entry) => entry.id === input.projectId)
	const generation = project?.generations.find((entry) => entry.id === input.generationId)
	const recommendation = generation?.recommendations.find(
		(entry) => entry.id === input.recommendationId
	)

	if (!project || !generation || !recommendation) {
		throw new Error('Recommendation not found')
	}

	recommendation.isSaved = !recommendation.isSaved
	project.updatedAt = new Date().toISOString()
	await writeWorkspace(viewer, workspace)
}

export async function addDemoCredits(viewer: ViewerSession) {
	const workspace = await readWorkspace(viewer)
	workspace.creditBalance += demoCreditAmount
	workspace.ledger.push(
		createLedgerEntry({
			label: 'Demo top-up',
			detail: 'Added local sandbox credits so generation and regeneration stay testable.',
			delta: demoCreditAmount,
		})
	)
	await writeWorkspace(viewer, workspace)
}

export async function resetWorkspace(viewer: ViewerSession) {
	const existingWorkspace = await readExistingWorkspace(viewer)

	if (existingWorkspace) {
		await deleteStoredAssets(collectWorkspaceAssetKeys(existingWorkspace))
	}

	await ensureWorkspaceRoot()
	await rm(workspaceFileUrl(viewer), { force: true })
	return writeWorkspace(viewer, createInitialWorkspace(viewer))
}

export async function getAccountData(viewer: ViewerSession) {
	const workspace = await getLandscapeWorkspaceData(viewer)
	const savedConcepts = workspace.projects.flatMap((project) =>
		project.generations.flatMap((generation) =>
			generation.concepts
				.filter((concept) => concept.isSaved)
				.map((concept) => ({
					id: concept.id,
					label: concept.label,
					caption: concept.caption,
					project: project.title,
					assetUrl: concept.assetUrl,
				}))
		)
	)

	const savedRecommendations = workspace.projects.flatMap((project) =>
		project.generations.flatMap((generation) =>
			generation.recommendations
				.filter((recommendation) => recommendation.isSaved)
				.map((recommendation) => ({
					id: recommendation.id,
					title: recommendation.title,
					project: project.title,
					category: recommendation.category,
					priceLabel: recommendation.priceLabel,
					reason: recommendation.reason,
				}))
		)
	)

	return {
		profile: {
			name: viewer.label,
			email: viewer.kind === 'user' ? viewer.email : 'Guest workspace only',
			creditBalance: workspace.viewer.creditBalance,
			projectCount: workspace.projects.length,
			savedConceptCount: savedConcepts.length,
			savedRecommendationCount: savedRecommendations.length,
		},
		savedConcepts,
		savedRecommendations,
		activity: workspace.ledger,
	}
}

export async function getBillingData(viewer: ViewerSession) {
	const workspace = await getLandscapeWorkspaceData(viewer)

	return {
		creditBalance: workspace.viewer.creditBalance,
		creditPacks: workspace.creditPacks,
		ledger: workspace.ledger,
		pricing: workspace.pricing,
	}
}
