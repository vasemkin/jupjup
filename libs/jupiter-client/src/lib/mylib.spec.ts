import { getQuote } from './client'
import { SOLANA_NATIVE_SOL_ADDRESS, SOLANA_WEN_ADDRESS } from '@jupjup/constants'

describe('axios-client', () => {
	it('can send a request', async () => {
		const res = await getQuote({
			inputMint: SOLANA_NATIVE_SOL_ADDRESS,
			outputMint: SOLANA_WEN_ADDRESS,
			amount: '100000000',
		})

		expect(res.inputMint).toEqual(SOLANA_NATIVE_SOL_ADDRESS)
		expect(res.outputMint).toEqual(SOLANA_WEN_ADDRESS)
	})
})
