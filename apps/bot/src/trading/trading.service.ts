import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import bs58 from 'bs58'
import { Interval } from '@nestjs/schedule'
import { getQuote } from '@jupjup/jupiter-client'
import {
	SOLANA_NATIVE_SOL,
	SOLANA_NATIVE_SOL_ADDRESS,
	SOLANA_USDC,
	SOLANA_USDC_ADDRESS,
} from '@jupjup/constants'
import {
	getTokenExchangeRate,
	getTokenValue,
	parseDecimals,
	parseUSDC,
} from '@jupjup/utils'

type RouteMap = Record<string, string[]>

@Injectable()
export class TradingService {
	wallet: Wallet
	logger: Logger

	constructor(private configService: ConfigService) {
		// this is set in the monorepo root
		const pk = this.configService.get('NX_SOLANA_PK') || ''

		this.logger = new Logger('TradingService')
		this.wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(pk)))

		const address = this.wallet.publicKey

		this.logger.log(`Wallet loaded at address ${address.toString()}!`)
	}

	@Interval(5000)
	async handleInterval() {
		this.logger.log('Called every 5 seconds')
		await this.getCurrentPrice()
	}

	async getCurrentPrice() {
		const solanaValue = await getTokenValue(
			SOLANA_USDC,
			SOLANA_NATIVE_SOL,
			100,
		)

		console.log(`for 100 USDC i will get ${solanaValue} SOL`)

		const usdcValue = await getTokenValue(
			SOLANA_NATIVE_SOL,
			SOLANA_USDC,
			solanaValue,
		)

		console.log(`for ${solanaValue} SOL i will get ${usdcValue} USDC`)

		const usdcRate = await getTokenExchangeRate(
			SOLANA_USDC,
			SOLANA_NATIVE_SOL,
			10,
		)
		console.log(`1 USDC costs ${usdcRate} SOL`)

		const solRate = await getTokenExchangeRate(
			SOLANA_NATIVE_SOL,
			SOLANA_USDC,
			10,
		)
		console.log(`1 SOL costs ${solRate} USDC`)
	}
}
