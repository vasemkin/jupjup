import { parseStrategy, parseUsdBudgetWithDefault } from './parsers'
import { DEFAULT_SETTINGS, Strategy } from '@jupjup/constants'

describe('parseStrategy', () => {
	it('returns PING_PONG for "PING_PONG" input', () => {
		expect(parseStrategy('PING_PONG')).toBe(Strategy.PING_PONG)
	})

	it('returns DDCA for any unrecognized string input', () => {
		expect(parseStrategy('RANDOM_STRATEGY')).toBe(Strategy.DDCA)
	})

	it('returns DDCA as default for null input', () => {
		expect(parseStrategy(null)).toBe(Strategy.DDCA)
	})

	it('returns DDCA as default for undefined input', () => {
		expect(parseStrategy(undefined)).toBe(Strategy.DDCA)
	})
})

describe('parseUsdBudgetWithDefault', () => {
	it('returns parsed amount for valid input', () => {
		expect(parseUsdBudgetWithDefault('100')).toBe('100000000')
	})

	it('returns default budget for null input', () => {
		expect(parseUsdBudgetWithDefault(null)).toBe(DEFAULT_SETTINGS.usdBudget)
	})

	it('returns default budget for undefined input', () => {
		expect(parseUsdBudgetWithDefault(undefined)).toBe(
			DEFAULT_SETTINGS.usdBudget,
		)
	})

	it('returns default budget for invalid input', () => {
		// Assuming parseUSDC throws an error for invalid input
		expect(parseUsdBudgetWithDefault('invalid')).toBe(
			DEFAULT_SETTINGS.usdBudget,
		)
	})
})
