import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import bs58 from 'bs58'
import { Interval } from '@nestjs/schedule'

import { SOLANA_NATIVE_SOL, SOLANA_USDC } from '@jupjup/constants'

import { getTokenExchangeRate, getTokenValue } from '@jupjup/utils'

import { SettingsService } from '../settings/settings.service'

type RouteMap = Record<string, string[]>

@Injectable()
export class TradingService {
	wallet: Wallet
	logger: Logger

	constructor(
		private configService: ConfigService,
		private settingsService: SettingsService,
	) {
		// this is set in the monorepo root
		const pk = this.configService.get('NX_SOLANA_PK') || ''

		this.logger = new Logger('TradingService')
		this.wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(pk)))

		const address = this.wallet.publicKey

		this.logger.log(`Wallet loaded at address ${address.toString()}!`)
	}

	@Interval(5000)
	async trade() {
		const exchangeSum = this.settingsService.getSettings().usdBudget

		this.logger.log(`Exchanging ${exchangeSum} USDC to SOL...`)

		const usdcRate = await getTokenExchangeRate(
			SOLANA_USDC,
			SOLANA_NATIVE_SOL,
			parseFloat(exchangeSum),
		)

		this.logger.log(`Current rate: ${usdcRate}`)
	}
}
