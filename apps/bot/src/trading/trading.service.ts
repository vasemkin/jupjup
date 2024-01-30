import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import bs58 from 'bs58'

type RouteMap = Record<string, string[]>

@Injectable()
export class TradingService {
	wallet: Wallet

	constructor(private configService: ConfigService) {
		// this is set in the monorepo root
		const pk = this.configService.get('NX_SOLANA_PK') || ''

		this.wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(pk)))

		const address = this.wallet.publicKey

		Logger.log(
			`Wallet at address ${address.toString()} loaded successfully!`,
		)
	}
}
