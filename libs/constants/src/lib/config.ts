/**
 * @fileoverview
 * This file defines the default settings for the trading bot application.
 * It includes constants that specify the default configuration for various aspects of the application,
 * such as the trading mode and budget. These settings are used as the initial configuration or fallbacks
 * in case user-specific settings are not available.
 *
 * @requires numerical - Module providing numerical constants related to Solana and USDC.
 * @requires strategies - Module containing strategy enums used by the trading bot.
 * @requires types - Module defining various custom types used throughout the application.
 */

import { SOLANA_USDC_10 } from './numerical'
import { Strategy } from './strategies'
import { AppSettings } from './types'

/**
 * Default settings for the application.
 *
 * @property {Strategy} tradingMode - The default trading strategy, set to DDCA.
 * @property {string} usdBudget - The default budget in USDC, using the SOLANA_USDC_10 constant.
 */
export const DEFAULT_SETTINGS: AppSettings = {
	tradingMode: Strategy.DDCA,
	usdBudget: SOLANA_USDC_10,
}
