import { parseUSDC } from './spl'

describe('parseUSDC', () => {
	it('should correctly parse a whole number amount', () => {
		expect(parseUSDC(10)).toBe('10000000')
	})

	it('should correctly parse a decimal amount', () => {
		expect(parseUSDC(10.5)).toBe('10500000')
	})

	it('should correctly handle zero', () => {
		expect(parseUSDC(0)).toBe('0')
	})

	it('should handle very large numbers', () => {
		expect(parseUSDC(123456789.123456)).toBe('123456789123456')
	})

	it('should throw an error for negative numbers', () => {
		expect(() => parseUSDC(-1)).toThrow('Invalid USDC amount')
	})

	it('should throw an error for non-numeric inputs', () => {
		// @ts-ignore
		expect(() => parseUSDC('abc')).toThrow('Invalid USDC amount')
		// @ts-ignore
		expect(() => parseUSDC(undefined)).toThrow('Invalid USDC amount')
	})
})
