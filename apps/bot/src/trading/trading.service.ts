import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import bs58 from 'bs58'
import { Interval } from '@nestjs/schedule'

import { SOLANA_NATIVE_SOL, SOLANA_USDC } from '@jupjup/constants'

import { getTokenExchangeRate } from '@jupjup/utils'

import { SettingsService } from '../settings/settings.service'
import { QuoteResponse, postSwap } from '@jupjup/jupiter-client'

type RouteMap = Record<string, string[]>

@Injectable()
export class TradingService {
	wallet: Wallet
	connection: Connection
	logger: Logger

	constructor(
		private configService: ConfigService,
		private settingsService: SettingsService,
	) {
		// this is set in the monorepo root
		const pk = this.configService.get('NX_SOLANA_PK') || ''

		this.logger = new Logger('TradingService')
		this.wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(pk)))

		this.connection = new Connection(
			this.configService.get('NX_SOLANA_RPC_ENDPOINT') || '',
		)

		const address = this.wallet.publicKey

		this.logger.log(`Wallet loaded at address ${address.toString()}!`)
	}

	@Interval(60 * 1000)
	async trade() {
		//todo: check which token has balance rn

		await this.swapForward()

		await this.swapBack()
	}

	async swapForward() {
		const exchangeSum = this.settingsService.getSettings().usdBudget

		const { value, quote } = await getTokenExchangeRate(
			SOLANA_USDC,
			SOLANA_NATIVE_SOL,
			parseFloat(exchangeSum),
		)

		this.logger.log(`Swapping USDC -> SOL at rate: ${value}`)

		await this.swap(quote)
	}

	async swapBack() {
		const exchangeSum = this.settingsService.getSettings().usdBudget
		this.logger.log(`Exchanging ${exchangeSum} SOL to USDT...`)

		const usdcRate = await getTokenExchangeRate(
			SOLANA_USDC,
			SOLANA_NATIVE_SOL,
			parseInt(exchangeSum),
		)

		const solRate = await getTokenExchangeRate(
			SOLANA_NATIVE_SOL,
			SOLANA_USDC,
			usdcRate.value,
		)

		this.logger.log(`Swapping SOL -> USDC at rate: ${solRate.value}`)

		await this.swap(solRate.quote)
	}

	async swap(quote: QuoteResponse) {
		// get serialized transaction
		const swapResult = await postSwap({
			quoteResponse: quote,
			userPublicKey: this.wallet.publicKey.toBase58(),
			dynamicComputeUnitLimit: true,
		})

		// submit transaction
		const swapTransactionBuf = Buffer.from(
			swapResult.swapTransaction,
			'base64',
		)

		let transaction = VersionedTransaction.deserialize(swapTransactionBuf)

		// sign the transaction
		transaction.sign([this.wallet.payer])

		const rawTransaction = transaction.serialize()
		const txid = await this.connection.sendRawTransaction(rawTransaction, {
			skipPreflight: true,
			maxRetries: 2,
		})

		const latestBlockHash = await this.connection.getLatestBlockhash()
		this.logger.log(`https://solscan.io/tx/${txid}`)

		await this.connection.confirmTransaction({
			blockhash: latestBlockHash.blockhash,
			lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
			signature: txid,
		})

		this.logger.log(`https://solscan.io/tx/${txid}`)
		this.logger.log(`Swapped successfully`)
	}
}
