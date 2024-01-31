import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
	Connection,
	GetProgramAccountsFilter,
	Keypair,
	PublicKey,
	VersionedTransaction,
} from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import bs58 from 'bs58'
import { Interval } from '@nestjs/schedule'

import {
	SOLANA_NATIVE_SOL,
	SOLANA_USDC,
	SOLANA_WEN,
	Token,
} from '@jupjup/constants'

import { getTokenExchangeRate, getTokenValue } from '@jupjup/utils'

import { SettingsService } from '../settings/settings.service'
import { QuoteResponse, postSwap } from '@jupjup/jupiter-client'

@Injectable()
export class TradingService {
	wallet: Wallet
	connection: Connection
	logger: Logger

	isTrading: boolean
	tradeSuccess: boolean
	abortController: AbortController

	forwardToken: Token
	backToken: Token

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

		this.abortController = new AbortController()

		this.logger.log(`Wallet loaded at address ${address.toString()}!`)

		this.isTrading = false
		this.tradeSuccess = false

		this.forwardToken = SOLANA_USDC
		this.backToken = SOLANA_WEN
	}

	@Interval(5 * 1000)
	async txNotMined() {
		if (this.isTrading && !this.tradeSuccess) {
			Logger.log('Trade unsuccessful, aborting')
			this.abortController.abort('Tx not mined')
			this.abortController = new AbortController()
		}
	}

	@Interval(10 * 1000)
	async trade() {
		const forwardTokenBalance = await this.getTokenBalance(
			this.forwardToken.address,
		)
		console.log({ forwardTokenBalance })

		const backTokenBalance = await this.getTokenBalance(
			this.backToken.address,
		)
		console.log({ backTokenBalance })

		this.isTrading = true
		if (forwardTokenBalance > backTokenBalance) {
			await this.swapForward()
		} else {
			await this.swapBack()
		}
		this.isTrading = false

		await this.swapBack()
	}

	async swapForward() {
		const exchangeSumUsd = this.settingsService.getSettings().usdBudget

		const usdcValue = await getTokenValue(
			SOLANA_USDC,
			this.forwardToken,
			parseFloat(exchangeSumUsd),
		)

		const forwardRate = await getTokenExchangeRate(
			this.forwardToken,
			this.backToken,
			usdcValue.value,
		)

		this.logger.log(
			`Swapping ${this.forwardToken.symbol} -> ${this.backToken.symbol} for value: ${usdcValue.value}`,
		)

		await this.swap(forwardRate.quote)
	}

	async swapBack() {
		const exchangeSumUsd = this.settingsService.getSettings().usdBudget

		const usdcValue = await getTokenValue(
			SOLANA_USDC,
			this.backToken,
			parseFloat(exchangeSumUsd),
		)

		const forwardRate = await getTokenExchangeRate(
			this.backToken,
			this.forwardToken,
			usdcValue.value,
		)

		this.logger.log(
			`Swapping ${this.backToken.symbol} -> ${this.forwardToken.symbol} for value: ${usdcValue.value}`,
		)

		await this.swap(forwardRate.quote)
	}

	async getTokenBalance(address: string) {
		const filters: GetProgramAccountsFilter[] = [
			{
				dataSize: 165, //size of account (bytes)
			},
			{
				memcmp: {
					offset: 32, //location of our query in the account (bytes)
					bytes: new PublicKey(this.wallet.publicKey).toBase58(),
				},
			},
		]

		const accounts = await this.connection.getParsedProgramAccounts(
			new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
			{ filters: filters },
		)

		accounts.forEach((account, i) => {
			//Parse the account data
			const parsedAccountInfo: any = account.account.data
			const mintAddress: string =
				parsedAccountInfo['parsed']['info']['mint']

			if (mintAddress === address) {
				const tokenBalance: number =
					parsedAccountInfo['parsed']['info']['tokenAmount'][
						'uiAmount'
					]
				return tokenBalance
			}
		})

		return 0
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

		try {
			await this.connection.confirmTransaction({
				blockhash: latestBlockHash.blockhash,
				lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
				signature: txid,
				abortSignal: this.abortController.signal,
			})

			this.logger.log(`https://solscan.io/tx/${txid}`)
			this.logger.log(`Swapped successfully`)

			this.tradeSuccess = true
		} catch (error) {
			this.tradeSuccess = false
		}
	}
}
