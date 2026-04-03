import {
	addDemoCredits,
	createGeneration,
	getLandscapeWorkspaceData,
	getViewerWorkspacePermissions,
	resetWorkspace,
	toggleSavedConcept,
	toggleSavedRecommendation,
	uploadAndCreateProject,
} from '$lib/server/landscape-workspace'
import { getOrCreateViewerSession } from '$lib/server/viewer-session'
import type { CreateGenerationInput, CreateProjectInput } from '$lib/types/landscape'
import { fail, redirect } from '@sveltejs/kit'

function readBoolean(formData: FormData, key: string) {
	const value = formData.get(key)
	return value === 'on' || value === 'true' || value === '1'
}

function normalizeProjectInput(formData: FormData, file: File): CreateProjectInput {
	return {
		title: String(formData.get('title') ?? '').trim(),
		projectType: String(
			formData.get('projectType') ?? 'curb_appeal'
		) as CreateProjectInput['projectType'],
		objective: String(formData.get('objective') ?? '').trim(),
		budgetLabel: String(formData.get('budgetLabel') ?? '').trim(),
		budgetMode: String(
			formData.get('budgetMode') ?? 'shopping'
		) as CreateProjectInput['budgetMode'],
		maintenanceLevel: String(
			formData.get('maintenanceLevel') ?? 'medium'
		) as CreateProjectInput['maintenanceLevel'],
		sunExposure: String(
			formData.get('sunExposure') ?? 'mixed'
		) as CreateProjectInput['sunExposure'],
		styleDirection: String(formData.get('styleDirection') ?? '').trim(),
		climateZone: String(formData.get('climateZone') ?? '').trim(),
		petFriendly: readBoolean(formData, 'petFriendly'),
		kidFriendly: readBoolean(formData, 'kidFriendly'),
		imageCount: Math.max(1, Math.min(5, Number(formData.get('imageCount') ?? 3))),
		photoLabel: file.name,
	}
}

function normalizeGenerationInput(formData: FormData): CreateGenerationInput {
	return {
		projectId: String(formData.get('projectId') ?? '').trim(),
		prompt: String(formData.get('prompt') ?? '').trim(),
		budgetLabel: String(formData.get('budgetLabel') ?? '').trim(),
		budgetMode: String(
			formData.get('budgetMode') ?? 'shopping'
		) as CreateGenerationInput['budgetMode'],
		maintenanceLevel: String(
			formData.get('maintenanceLevel') ?? 'medium'
		) as CreateGenerationInput['maintenanceLevel'],
		styleDirection: String(formData.get('styleDirection') ?? '').trim(),
		imageCount: Math.max(1, Math.min(5, Number(formData.get('imageCount') ?? 3))),
	}
}

function redirectToSignIn(reason: string) {
	return redirect(303, `/sign-in?reason=${encodeURIComponent(reason)}&next=/studio`)
}

export async function load(event) {
	const viewer = await getOrCreateViewerSession(event)

	return {
		workspace: await getLandscapeWorkspaceData(viewer),
		selectedProjectId: event.url.searchParams.get('project'),
		selectedGenerationId: event.url.searchParams.get('generation'),
		selectedConceptId: event.url.searchParams.get('concept'),
	}
}

export const actions = {
	createProject: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		const permissions = await getViewerWorkspacePermissions(viewer)

		if (!permissions.canCreateProject) {
			redirectToSignIn('continue')
		}

		const formData = await event.request.formData()
		const file = formData.get('photo')

		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { action: 'createProject', error: 'A yard photo is required.' })
		}

		const input = normalizeProjectInput(formData, file)

		if (!input.title || !input.objective || !input.budgetLabel || !input.styleDirection) {
			return fail(400, {
				action: 'createProject',
				error: 'Title, objective, budget, and style direction are required.',
			})
		}

		try {
			const result = await uploadAndCreateProject(viewer, input, file)
			redirect(303, `/studio?project=${result.projectId}&generation=${result.generationId}`)
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'status' in error && 'location' in error) {
				throw error
			}

			return fail(400, {
				action: 'createProject',
				error: error instanceof Error ? error.message : 'Unable to create the project.',
			})
		}
	},
	regenerate: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		const permissions = await getViewerWorkspacePermissions(viewer)

		if (!permissions.canCreateGeneration) {
			redirectToSignIn('continue')
		}

		const formData = await event.request.formData()
		const input = normalizeGenerationInput(formData)

		if (!input.projectId || !input.prompt || !input.budgetLabel || !input.styleDirection) {
			return fail(400, {
				action: 'regenerate',
				error: 'Prompt, budget, and style direction are required to regenerate concepts.',
			})
		}

		try {
			const result = await createGeneration(viewer, input)
			redirect(303, `/studio?project=${result.projectId}&generation=${result.generationId}`)
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'status' in error && 'location' in error) {
				throw error
			}

			return fail(400, {
				action: 'regenerate',
				error: error instanceof Error ? error.message : 'Unable to generate a new concept pass.',
			})
		}
	},
	toggleSaveConcept: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		const permissions = await getViewerWorkspacePermissions(viewer)

		if (!permissions.canSave) {
			redirectToSignIn('save')
		}

		const formData = await event.request.formData()
		const projectId = String(formData.get('projectId') ?? '')
		const generationId = String(formData.get('generationId') ?? '')
		const conceptId = String(formData.get('conceptId') ?? '')

		await toggleSavedConcept(viewer, { projectId, generationId, conceptId })
		throw redirect(303, `/studio?project=${projectId}&generation=${generationId}`)
	},
	toggleSaveRecommendation: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		const permissions = await getViewerWorkspacePermissions(viewer)

		if (!permissions.canSave) {
			redirectToSignIn('save')
		}

		const formData = await event.request.formData()
		const projectId = String(formData.get('projectId') ?? '')
		const generationId = String(formData.get('generationId') ?? '')
		const recommendationId = String(formData.get('recommendationId') ?? '')

		await toggleSavedRecommendation(viewer, { projectId, generationId, recommendationId })
		throw redirect(303, `/studio?project=${projectId}&generation=${generationId}`)
	},
	addDemoCredits: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		const permissions = await getViewerWorkspacePermissions(viewer)

		if (!permissions.canUseDeveloperTopUp) {
			redirectToSignIn('continue')
		}

		await addDemoCredits(viewer)
		throw redirect(303, '/studio')
	},
	resetWorkspace: async (event) => {
		const viewer = await getOrCreateViewerSession(event)
		await resetWorkspace(viewer)
		throw redirect(303, '/studio')
	},
}
