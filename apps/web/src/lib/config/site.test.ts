import { describe, expect, test } from 'bun:test'
import { siteConfig } from './site'

describe('site config', () => {
	test('describes the consumer landscaping product', () => {
		expect(siteConfig.name).toBe('Landscape It')
		expect(siteConfig.cta.length).toBeGreaterThan(5)
		expect(siteConfig.description.toLowerCase()).toContain('yard')
	})
})
