import { parseUSDC } from './spl'

describe('parseUSDC', () => {
	it('should correctly parse a whole number amount', () => {
		expect(parseUSDC(10).result).toBe('10000000')
	})

	it('should correctly parse floats', () => {
		expect(parseUSDC(10.5).result).toBe('10500000')
	})

	it('should correctly handle zero', () => {
		expect(parseUSDC(0).result).toBe('0')
	})

	it('should handle very large numbers', () => {
		expect(parseUSDC(123456789.123456).result).toBe('123456789123456')
	})

	it('should throw an error for negative numbers', () => {
		expect(parseUSDC(-1).error).toBe('Invalid input')
	})

	it('should throw an error for non-numeric inputs', () => {
		// @ts-ignore
		expect(parseUSDC('abc').error).toBe('Invalid input')
		// @ts-ignore
		expect(parseUSDC(undefined).error).toBe('Invalid input')
	})
})
