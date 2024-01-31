import { Module } from '@nestjs/common'

import { TradingService } from './trading.service'
import { TradingController } from './trading.controller'
import { SettingsModule } from '../settings/settings.module'

@Module({
	imports: [SettingsModule],
	controllers: [TradingController],
	providers: [TradingService],
})
export class TradingModule {}
