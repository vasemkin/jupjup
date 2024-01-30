import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { AppService } from './app.service'
import { TradingModule } from '../trading/trading.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		TradingModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
