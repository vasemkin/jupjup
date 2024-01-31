import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SettingsModel } from './settings.model'
import { parseStrategy, parseUsdBudgetWithDefault } from '@jupjup/utils'

@Injectable()
export class SettingsService {
	private mockDB: SettingsModel

	constructor(private configService: ConfigService) {
		this.mockDB = {
			tradingMode: parseStrategy(this.configService.get('TRADING_MODE')),
			usdBudget: this.configService.get('NX_USD_BUDGET') ?? '10',
		}
	}

	getSettings = (): SettingsModel => {
		return this.mockDB
	}
}
