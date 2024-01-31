export type Token = {
	address: string
	decimals: number
	symbol: string
}

export const SOLANA_NATIVE_SOL_ADDRESS =
	'So11111111111111111111111111111111111111112'

export const SOLANA_WEN_ADDRESS = 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk'

export const SOLANA_USDC_ADDRESS =
	'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

export const SOLANA_JUP_ADDRESS = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'

export const SOLANA_NATIVE_SOL: Token = {
	address: SOLANA_NATIVE_SOL_ADDRESS,
	decimals: 9,
	symbol: 'WSOL',
}

export const SOLANA_WEN: Token = {
	address: SOLANA_WEN_ADDRESS,
	decimals: 5,
	symbol: 'WEN',
}

export const SOLANA_USDC: Token = {
	address: SOLANA_USDC_ADDRESS,
	decimals: 6,
	symbol: 'USDC',
}

export const SOLANA_JUP: Token = {
	address: SOLANA_JUP_ADDRESS,
	decimals: 6,
	symbol: 'JUP',
}
