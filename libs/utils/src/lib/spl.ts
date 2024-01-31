import { SOLANA_USDC_ADDRESS, Token } from '@jupjup/constants'
import { getQuote, QuoteResponse } from '@jupjup/jupiter-client'

/**
 * Calculates the amount of SPL Token that can be received for a given amount of USDC.
 *
 * This function calls the `getQuote` function from a DEX module to fetch the current
 * exchange rate between USDC and the specified SPL Token. It then calculates and returns
 * the amount of SPL Token that would be received for the specified amount of USDC.
 *
 * @param usdcAmount - The amount of USDC to be traded. This should be a positive number.
 * @param splTokenMint - The mint address for the SPL Token to be received. This identifies which SPL Token is being exchanged for.
 * @returns A promise that resolves to the amount of SPL Token that can be received.
 *
 * @example
 * // Example usage
 * calculateSPLTokenAmount('100', 'SPL_Token_Mint_Address')
 *   .then(amount => console.log(`You will receive ${amount} SPL Tokens`))
 *   .catch(error => console.error(error));
 *
 * @throws {Error} Throws an error if the `getQuote` function call fails or if the quote response is invalid.
 *
 * Note: This function assumes that the `getQuote` function and `QuoteResponse` interface are correctly implemented
 * and available in the scope where this function is used. The function also assumes that the DEX API returns the
 * 'outAmount' as a string which needs to be parsed into a number.
 */
export const calculateSPLTokenAmount = async (
	usdcAmount: string,
	splTokenMint: string,
): Promise<{ amount: number | null; error: string | null }> => {
	try {
		const quoteResponse = await getQuote({
			inputMint: SOLANA_USDC_ADDRESS,
			outputMint: splTokenMint,
			amount: usdcAmount,
		})

		if (!quoteResponse || !quoteResponse.outAmount) {
			return { amount: null, error: 'Invalid quote response' }
		}

		const splTokenAmount = parseFloat(quoteResponse.outAmount)
		return { amount: splTokenAmount, error: null }
	} catch (error) {
		console.error('Error getting quote: ', error)
		return { amount: null, error: 'Unable to get quote' }
	}
}

/**
 * Parses a decimal amount to its string representation in the smallest unit based on the specified decimal places.
 * This function converts a decimal value into the equivalent amount in the smallest unit, represented as a string.
 *
 * @example
 * const amount = parseDecimals(10.5, 6); // '10500000' for 6 decimal places
 *
 * @param amount - The decimal amount to be parsed.
 * @param decimals - The number of decimal places for the conversion.
 * @returns The string representation of the amount in the smallest unit.
 */
export const parseDecimals = (
	amount: number,
	decimals: number,
): { result: string | null; error: string | null; result_n: number | null } => {
	if (
		typeof amount === 'undefined' ||
		isNaN(amount) ||
		amount < 0 ||
		decimals < 0
	) {
		return { result: null, result_n: null, error: 'Invalid input' }
	}

	const smallestUnitMultiplier = 10 ** decimals
	const smallestUnitAmount = amount * smallestUnitMultiplier

	return {
		result: BigInt(Math.round(smallestUnitAmount)).toString(),
		result_n: Math.round(smallestUnitAmount),
		error: null,
	}
}

/**
 * Specialized function of parseDecimals for USDC. Parses a decimal USDC amount to its string
 * representation in the smallest unit. USDC uses 6 decimal places.
 *
 * @example
 * const usdcAmount = parseUSDC(10.5); // '10500000'
 *
 * @param amount - The decimal USDC amount to be parsed.
 * @returns The string representation of the USDC amount in the smallest unit.
 */
export const parseUSDC = (
	amount: number,
): { result: string | null; error: string | null; result_n: number | null } =>
	parseDecimals(amount, 6)

type TokenResponse = {
	value: number
	quote: QuoteResponse
}

/**
 * Fetches the amount of token B you get for token A.
 *
 * @param inputToken - The token object representing the input token.
 * @param outputToken - The token object representing the output token.
 * @param amount - The amount of the input token to be swapped.
 * @returns The exchange rate as a number, or null if the quote cannot be fetched.
 */
export async function getTokenValue(
	inputToken: Token,
	outputToken: Token,
	amount: number,
): Promise<TokenResponse | null> {
	try {
		const inputAmountString = parseDecimals(amount, inputToken.decimals)
			.result!
		const quoteResponse: QuoteResponse = await getQuote({
			inputMint: inputToken.address,
			outputMint: outputToken.address,
			amount: inputAmountString,
			slippageBps: 10,
		})

		if (!quoteResponse || !quoteResponse.outAmount) {
			return null
		}

		const multiplier = 10 ** outputToken.decimals

		const outputAmount = parseFloat(quoteResponse.outAmount) / multiplier

		return { value: outputAmount, quote: quoteResponse }
	} catch (error) {
		console.error('Error fetching exchange rate: ', error)
		return null
	}
}

/**
 * Fetches how much a token B costs in token A.
 *
 * @param inputToken - The token object representing the input token.
 * @param outputToken - The token object representing the output token.
 * @param amount - The amount of the input token to be swapped.
 * @returns The exchange rate as a number, or null if the quote cannot be fetched.
 */
export async function getTokenExchangeRate(
	inputToken: Token,
	outputToken: Token,
	amount: number,
): Promise<TokenResponse | null> {
	try {
		const output = await getTokenValue(inputToken, outputToken, amount)

		return output?.value
			? { value: output.value / amount, quote: output.quote }
			: null
	} catch (error) {
		console.error('Error fetching exchange rate: ', error)
		return null
	}
}
