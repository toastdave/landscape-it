import { describe, expect, test } from 'bun:test'
import { createConceptDrafts, createLandscapeBrief, getProjectTypeLabel } from './landscape-engine'

const input = {
	title: 'Maple front yard',
	projectType: 'curb_appeal' as const,
	objective: 'Make the entry feel warmer and easier to maintain.',
	budgetLabel: '$4k-$8k',
	budgetMode: 'shopping' as const,
	maintenanceLevel: 'low' as const,
	sunExposure: 'mixed' as const,
	styleDirection: 'Warm modern cottage',
	climateZone: 'Zone 9',
	petFriendly: true,
	kidFriendly: false,
	imageCount: 3,
}

describe('landscape engine', () => {
	test('creates a practical brief from project inputs', () => {
		const brief = createLandscapeBrief(input)

		expect(brief.summary).toContain('Maple front yard')
		expect(brief.phases).toHaveLength(3)
		expect(brief.quickWins[0]).toContain('edge lines')
	})

	test('creates deterministic concept drafts for requested count', () => {
		const drafts = createConceptDrafts(input)

		expect(drafts).toHaveLength(3)
		expect(drafts[0]?.label).toBe('Option A')
		expect(drafts[1]?.svg).toContain('<svg')
		expect(drafts[2]?.caption).toContain('$4k-$8k')
	})

	test('returns readable labels for project types', () => {
		expect(getProjectTypeLabel('curb_appeal')).toBe('Curb appeal')
	})
})
