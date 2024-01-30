import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { TradingService } from './trading.service'

describe('TradingService', () => {
	let service: TradingService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TradingService],
			imports: [
				ConfigModule.forRoot({ isGlobal: true }),
				ScheduleModule.forRoot(),
			],
		}).compile()

		service = module.get<TradingService>(TradingService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
