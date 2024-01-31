import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SettingsModel } from './settings.model'
import { parseStrategy, parseUsdBudgetWithDefault } from '@jupjup/utils'

@Injectable()
export class SettingsService {
	private mockDB: SettingsModel

	constructor(private configService: ConfigService) {
		this.mockDB.tradingMode = parseStrategy(
			this.configService.get('TRADING_MODE'),
		)

		this.mockDB.usdBudget = parseUsdBudgetWithDefault(
			this.configService.get('USD_BUDGET'),
		)
	}

	getSettings = (): SettingsModel => {
		return this.mockDB
	}
}
