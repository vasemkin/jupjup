import { Strategy } from './strategies'

export type AppSettings = {
	tradingMode: Strategy
	usdBudget: string
}

export type Nullish<T> = T | null | undefined
