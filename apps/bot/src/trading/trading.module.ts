import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TradingService } from './trading.service'
import { TradingController } from './trading.controller'

@Module({
	controllers: [TradingController],
	providers: [TradingService],
})
export class TradingModule {}
