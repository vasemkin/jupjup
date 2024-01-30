import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SettingsModel } from './settings.model'
import { parseStrategy } from '@jupjup/utils'

@Injectable()
export class SettingsService {
	mockDB: SettingsModel

	constructor(private configService: ConfigService) {
		this.mockDB.tradingMode = parseStrategy(
			this.configService.get('TRADING_MODE'),
		)
	}
}
