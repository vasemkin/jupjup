import { Strategy } from '@jupjup/constants'
import { parseUSDC } from '@jupjup/utils'

export type AppConfig = {
	tradingStrategy: Strategy
	startingFundsUSDC: string
}

export const DEFAULT_CONFIG: AppConfig = {
	tradingStrategy: Strategy.DDCA,
	startingFundsUSDC: parseUSDC(10).result,
}
