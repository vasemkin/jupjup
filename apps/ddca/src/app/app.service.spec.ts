import { Test } from '@nestjs/testing'

import { AppService } from './app.service'

import { SOLANA_NATIVE_SOL_ADDRESS, SOLANA_WEN_ADDRESS } from '@jupjup/constants'
import { getQuote } from '@jupjup/jupiter-client'

describe('AppService', () => {
	let service: AppService

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [AppService],
		}).compile()

		service = app.get<AppService>(AppService)
	})

	describe.only('getData', () => {
		it('should get data from jupiter client', async () => {
			const res = await getQuote({
				inputMint: SOLANA_NATIVE_SOL_ADDRESS,
				outputMint: SOLANA_WEN_ADDRESS,
				amount: '100000',
			})

			console.log({ res })

			// expect(
			// ).not.toThrow
		})
	})
})
