import { SOLANA_USDC_ADDRESS } from '@jupjup/constants'
import { getQuote, QuoteResponse } from '@jupjup/jupiter-client'

/**
 * Calculates the amount of SPL Token that can be received for a given amount of USDC.
 *
 * This function calls the `getQuote` function from a DEX module to fetch the current
 * exchange rate between USDC and the specified SPL Token. It then calculates and returns
 * the amount of SPL Token that would be received for the specified amount of USDC.
 *
 * @param {number} usdcAmount - The amount of USDC to be traded. This should be a positive number.
 * @param {string} usdcMint - The mint address for USDC. This is used to specify the type of USDC being traded.
 * @param {string} splTokenMint - The mint address for the SPL Token to be received. This identifies which SPL Token is being exchanged for.
 * @returns {Promise<number>} A promise that resolves to the amount of SPL Token that can be received.
 *
 * @example
 * // Example usage
 * calculateSPLTokenAmount(100, 'USDC_Mint_Address', 'SPL_Token_Mint_Address')
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
): Promise<number> => {
	// Call getQuote with USDC amount and mint addresses
	let quoteResponse: QuoteResponse
	try {
		quoteResponse = await getQuote({
			inputMint: SOLANA_USDC_ADDRESS,
			outputMint: splTokenMint,
			amount: usdcAmount,
		})
	} catch (error) {
		console.error('Error getting quote: ', error)
		throw new Error('Unable to get quote')
	}

	// Check if the response is valid
	if (!quoteResponse || !quoteResponse.outAmount) {
		throw new Error('Invalid quote response')
	}

	// Convert outAmount to number (assuming it's a string in the response)
	const splTokenAmount = parseFloat(quoteResponse.outAmount)

	// You can add additional checks or logic here if needed

	return splTokenAmount
}

/**
 * Parses a decimal USDC amount to its string representation in the smallest unit.
 *
 * USDC, like many tokens on Solana, uses 6 decimal places. This function converts
 * a decimal USDC value into the equivalent amount in the smallest unit, represented
 * as a string. For example, an input of 10.5 will be converted to '10500000'.
 *
 * @param {number} usdcAmount - The decimal USDC amount.
 * @returns {string} The string representation of the USDC amount in the smallest unit.
 *
 * @example
 * // Example usage
 * const amount = parseUSDC(10.5); // '10500000'
 *
 * @throws {Error} Throws an error if the input is not a valid number.
 */
export const parseUSDC = (usdcAmount: number): string => {
	if (typeof usdcAmount === 'undefined' || isNaN(usdcAmount) || usdcAmount < 0) {
		throw new Error('Invalid USDC amount')
	}

	const decimals = 6 // USDC has 6 decimal places
	const smallestUnitMultiplier = 10 ** decimals
	const smallestUnitAmount = usdcAmount * smallestUnitMultiplier

	// Use BigInt to avoid precision issues with very large numbers
	return BigInt(smallestUnitAmount).toString()
}
