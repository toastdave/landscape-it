import { describe, expect, test } from 'bun:test'
import {
	creditPack,
	landscapeConcept,
	recommendation,
	savedConcept,
	savedRecommendation,
	yardAnalysis,
	yardProject,
} from './index'

describe('schema', () => {
	test('defines the core landscaping tables', () => {
		expect(Object.keys(yardProject)).toContain('projectType')
		expect(Object.keys(yardAnalysis)).toContain('requestedImageCount')
		expect(Object.keys(creditPack)).toContain('credits')
		expect(Object.keys(landscapeConcept)).toContain('estimatedBudgetLabel')
		expect(Object.keys(recommendation)).toContain('bucket')
		expect(Object.keys(savedConcept)).toContain('landscapeConceptId')
		expect(Object.keys(savedRecommendation)).toContain('recommendationId')
	})
})
