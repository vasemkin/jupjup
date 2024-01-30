import { Nullish, Strategy, DEFAULT_SETTINGS } from '@jupjup/constants'
import { parseUSDC } from './spl'

/**
 * Parses a given string to determine the trading strategy.
 *
 * This function accepts a string value that represents a trading strategy and converts it into
 * a corresponding `Strategy` enum value. If the input is nullish (null or undefined) or doesn't
 * match any predefined strategy, it defaults to the DDCA (Dumb Dollar Cost Averaging) strategy.
 *
 * @param val - The string value representing the trading strategy, which could be nullish.
 * @returns The corresponding `Strategy` enum value, or null if the input is nullish.
 *
 * @example
 * const strategy = parseStrategy('PING_PONG'); // Returns Strategy.PING_PONG
 * const defaultStrategy = parseStrategy(undefined); // Returns Strategy.DDCA
 */
export const parseStrategy = (val: Nullish<string>) => {
	switch (val) {
		case 'PING_PONG':
			return Strategy.PING_PONG

		default:
			return DEFAULT_SETTINGS.tradingMode
	}
}

/**
 * Parses a given string representing a USDC amount and returns the parsed amount or a default budget.
 *
 * This function attempts to parse the provided string value as a USDC amount. If the input is nullish (null or undefined),
 * or if the parsing fails, it returns a default USDC budget defined in `DEFAULT_SETTINGS`.
 *
 * @param val - The string value representing the USDC amount, which could be nullish.
 * @returns The parsed USDC amount as a string, or the default budget from `DEFAULT_SETTINGS`.
 *
 * @example
 * const budget = parseUsdBudgetWithDefault('100'); // Returns parsed USDC amount
 * const defaultBudget = parseUsdBudgetWithDefault(null); // Returns default budget from DEFAULT_SETTINGS
 */
export const parseUsdBudgetWithDefault = (val: Nullish<string>) => {
	if (!val) {
		return DEFAULT_SETTINGS.usdBudget
	}

	try {
		const parsed = parseUSDC(parseInt(val))

		if (parsed.result) {
			return parsed.result
		}

		return DEFAULT_SETTINGS.usdBudget
	} catch (error) {
		return DEFAULT_SETTINGS.usdBudget
	}
}
