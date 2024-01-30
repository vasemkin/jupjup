import { AppSettings, Strategy } from '@jupjup/constants'

export class SettingsModel implements AppSettings {
	tradingMode: Strategy
	usdBudget: string
}
