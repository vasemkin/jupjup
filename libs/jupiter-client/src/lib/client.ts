/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * Jupiter API v6
 * The core of [jup.ag](https://jup.ag). Easily get a quote and swap through Jupiter API.

### Rate Limit
The rate limit is 150 requests / 60 seconds. If you need a higher rate limit, feel free to contact us on [#developer-support](https://discord.com/channels/897540204506775583/910250162402779146) on Discord.

### API Wrapper
- Typescript [@jup-ag/api](https://github.com/jup-ag/jupiter-quote-api-node)

### Data types
- Public keys are base58 encoded strings
- raw data such as Vec<u8\> are base64 encoded strings

 * OpenAPI spec version: 6.0.0
 */
import { customInstance } from './axios'
import type { BodyType } from './axios'
export type GetIndexedRouteMapParams = {
	/**
	 * Default is false. Direct Routes limits Jupiter routing to single hop routes only.
	 */
	onlyDirectRoutes?: OnlyDirectRoutesParameterParameter
}

export type GetProgramIdToLabel200 = { [key: string]: string }

/**
 * If you want to charge the user a fee, you can specify the fee in BPS. Fee % is taken out of the output token.
 */
export type PlatformFeeBpsParameterParameter = number

/**
 * Rough estimate of the max accounts to be used for the quote, so that you can compose with your own accounts
 */
export type MaxAccountsParameterParameter = number

/**
 * Default is false. Instead of using versioned transaction, this will use the legacy transaction.
 */
export type AsLegacyTransactionParameterParameter = boolean

/**
 * Default is false. Direct Routes limits Jupiter routing to single hop routes only.
 */
export type OnlyDirectRoutesParameterParameter = boolean

/**
 * Default is that all DEXes are included. You can pass in the DEXes that you want to exclude and separate them by `,`. You can check out the full list [here](https://quote-api.jup.ag/v6/program-id-to-label).
 */
export type ExcludeDexesParameterParameter = string[]

/**
 * Default is that all DEXes are included. You can pass in the DEXes that you want to include only and separate them by `,`. You can check out the full list [here](https://quote-api.jup.ag/v6/program-id-to-label).
 */
export type DexesParameterParameter = string[]

export type SwapModeParameterParameter =
	(typeof SwapModeParameterParameter)[keyof typeof SwapModeParameterParameter]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SwapModeParameterParameter = {
	ExactIn: 'ExactIn',
	ExactOut: 'ExactOut',
} as const

/**
 * The slippage % in BPS. If the output token amount exceeds the slippage then the swap transaction will fail.
 */
export type SlippageParameterParameter = number

/**
 * The amount to swap, have to factor in the token decimals.
 */
export type AmountParameterParameter = string

/**
 * Output token mint address
 */
export type OutputMintParameterParameter = string

/**
 * Input token mint address
 */
export type InputMintParameterParameter = string

export type GetQuoteParams = {
	/**
	 * Input token mint address
	 */
	inputMint: InputMintParameterParameter
	/**
	 * Output token mint address
	 */
	outputMint: OutputMintParameterParameter
	/**
	 * The amount to swap, have to factor in the token decimals.
	 */
	amount: AmountParameterParameter
	/**
	 * The slippage % in BPS. If the output token amount exceeds the slippage then the swap transaction will fail.
	 */
	slippageBps?: SlippageParameterParameter
	/**
	 * (ExactIn or ExactOut) Defaults to ExactIn. ExactOut is for supporting use cases where you need an exact token amount, like payments. In this case the slippage is on the input token.
	 */
	swapMode?: SwapModeParameterParameter
	/**
	 * Default is that all DEXes are included. You can pass in the DEXes that you want to include only and separate them by `,`. You can check out the full list [here](https://quote-api.jup.ag/v6/program-id-to-label).
	 */
	dexes?: DexesParameterParameter
	/**
	 * Default is that all DEXes are included. You can pass in the DEXes that you want to exclude and separate them by `,`. You can check out the full list [here](https://quote-api.jup.ag/v6/program-id-to-label).
	 */
	excludeDexes?: ExcludeDexesParameterParameter
	/**
	 * Default is false. Direct Routes limits Jupiter routing to single hop routes only.
	 */
	onlyDirectRoutes?: OnlyDirectRoutesParameterParameter
	/**
	 * Default is false. Instead of using versioned transaction, this will use the legacy transaction.
	 */
	asLegacyTransaction?: AsLegacyTransactionParameterParameter
	/**
	 * If you want to charge the user a fee, you can specify the fee in BPS. Fee % is taken out of the output token.
	 */
	platformFeeBps?: PlatformFeeBpsParameterParameter
	/**
	 * Rough estimate of the max accounts to be used for the quote, so that you can compose with your own accounts
	 */
	maxAccounts?: MaxAccountsParameterParameter
}

/**
 * All the possible route and their corresponding output mints
 */
export type IndexedRouteMapResponseIndexedRouteMap = { [key: string]: number[] }

export interface IndexedRouteMapResponse {
	/** All the possible route and their corresponding output mints */
	indexedRouteMap: IndexedRouteMapResponseIndexedRouteMap
	/** All the mints that are indexed to match in indexedRouteMap */
	mintKeys: string[]
}

export interface SwapInstructionsResponse {
	/** The lookup table addresses that you can use if you are using versioned transaction. */
	addressLookupTableAddresses: string[]
	/** Unwrap the SOL if `wrapAndUnwrapSol = true`. */
	cleanupInstruction?: Instruction
	/** The necessary instructions to setup the compute budget. */
	computeBudgetInstructions: Instruction[]
	/** Setup missing ATA for the users. */
	setupInstructions: Instruction[]
	/** The actual swap instruction. */
	swapInstruction: Instruction
	/** If you are using `useTokenLedger = true`. */
	tokenLedgerInstruction?: Instruction
}

export interface SwapResponse {
	lastValidBlockHeight: number
	prioritizationFeeLamports?: number
	swapTransaction: string
}

/**
 * Prioritization fee lamports paid for the transaction in addition to the signatures fee. Mutually exclusive with compute_unit_price_micro_lamports. If `auto` is used, Jupiter will automatically set a priority fee and it will be capped at 5,000,000 lamports / 0.005 SOL.
 */
export type SwapRequestPrioritizationFeeLamports = number | string

/**
 * The compute unit price to prioritize the transaction, the additional fee will be `computeUnitLimit (1400000) * computeUnitPriceMicroLamports`. If `auto` is used, Jupiter will automatically set a priority fee and it will be capped at 5,000,000 lamports / 0.005 SOL.
 */
export type SwapRequestComputeUnitPriceMicroLamports = number | string

export interface SwapRequest {
	/** Default is false. Request a legacy transaction rather than the default versioned transaction, needs to be paired with a quote using asLegacyTransaction otherwise the transaction might be too large. */
	asLegacyTransaction?: boolean
	/** The compute unit price to prioritize the transaction, the additional fee will be `computeUnitLimit (1400000) * computeUnitPriceMicroLamports`. If `auto` is used, Jupiter will automatically set a priority fee and it will be capped at 5,000,000 lamports / 0.005 SOL. */
	computeUnitPriceMicroLamports?: SwapRequestComputeUnitPriceMicroLamports
	/** Public key of the token account that will be used to receive the token out of the swap. If not provided, the user's ATA will be used. If provided, we assume that the token account is already initialized. */
	destinationTokenAccount?: string
	/** When enabled, it will do a swap simulation to get the compute unit used and set it in ComputeBudget's compute unit limit. This will increase latency slightly since there will be one extra RPC call to simulate this. Default is `false`. */
	dynamicComputeUnitLimit?: boolean
	/** Fee token account for the output token, it is derived using the seeds = ["referral_ata", referral_account, mint] and the `REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3` referral contract (only pass in if you set a `platformFeeBps` in `/quote` and make sure that the feeAccount has been created). */
	feeAccount?: string
	/** Prioritization fee lamports paid for the transaction in addition to the signatures fee. Mutually exclusive with compute_unit_price_micro_lamports. If `auto` is used, Jupiter will automatically set a priority fee and it will be capped at 5,000,000 lamports / 0.005 SOL. */
	prioritizationFeeLamports?: SwapRequestPrioritizationFeeLamports
	quoteResponse: QuoteResponse
	/** Restrict intermediate tokens to a top token set that has stable liquidity. This will help to ease potential high slippage error rate when swapping with minimal impact on pricing. */
	restrictIntermediateTokens?: boolean
	/** When enabled, it will not do any rpc calls check on user's accounts. Enable it only when you already setup all the accounts needed for the trasaction, like wrapping or unwrapping sol, destination account is already created. */
	skipUserAccountsRpcCalls?: boolean
	/** The user public key. */
	userPublicKey: string
	/** Default is true. This enables the usage of shared program accountns. That means no intermediate token accounts or open orders accounts need to be created for the users. But it also means that the likelihood of hot accounts is higher. */
	useSharedAccounts?: boolean
	/** Default is false. This is useful when the instruction before the swap has a transfer that increases the input token amount. Then, the swap will just use the difference between the token ledger token amount and post token amount. */
	useTokenLedger?: boolean
	/** Default is true. If true, will automatically wrap/unwrap SOL. If false, it will use wSOL token account.  Will be ignored if `destinationTokenAccount` is set because the `destinationTokenAccount` may belong to a different user that we have no authority to close. */
	wrapAndUnwrapSol?: boolean
}

export interface SwapInfo {
	ammKey: string
	feeAmount: string
	feeMint: string
	inAmount: string
	inputMint: string
	label?: string
	outAmount: string
	outputMint: string
}

export interface RoutePlanStep {
	percent: number
	swapInfo: SwapInfo
}

export interface PlatformFee {
	amount?: string
	feeBps?: number
}

export type SwapMode = (typeof SwapMode)[keyof typeof SwapMode]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SwapMode = {
	ExactIn: 'ExactIn',
	ExactOut: 'ExactOut',
} as const

export interface QuoteResponse {
	contextSlot?: number
	inAmount: string
	inputMint: string
	otherAmountThreshold: string
	outAmount: string
	outputMint: string
	platformFee?: PlatformFee
	priceImpactPct: string
	routePlan: RoutePlanStep[]
	slippageBps: number
	swapMode: SwapMode
	timeTaken?: number
}

export interface AccountMeta {
	isSigner: boolean
	isWritable: boolean
	pubkey: string
}

export interface Instruction {
	accounts: AccountMeta[]
	data: string
	programId: string
}

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
	config: any,
	args: infer P,
) => any
	? P
	: never

/**
 * Sends a GET request to the Jupiter API to get the best priced quote.
 * @summary GET /quote
 */
export const getQuote = (
	params: GetQuoteParams,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<QuoteResponse>({ url: `/quote`, method: 'GET', params }, options)
}

/**
 * Returns a transaction that you can use from the quote you get from `/quote`.
 * @summary POST /swap
 */
export const postSwap = (
	swapRequest: BodyType<SwapRequest>,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<SwapResponse>(
		{
			url: `/swap`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: swapRequest,
		},
		options,
	)
}

/**
 * Returns instructions that you can use from the quote you get from `/quote`.
 * @summary POST /swap-instructions
 */
export const postSwapInstructions = (
	swapRequest: BodyType<SwapRequest>,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<SwapInstructionsResponse>(
		{
			url: `/swap-instructions`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: swapRequest,
		},
		options,
	)
}

/**
 * Returns a hash, which key is the program id and value is the label. This is used to help map error from transaction by identifying the fault program id. With that, we can use the `excludeDexes` or `dexes` parameter.
 * @summary GET /program-id-to-label
 */
export const getProgramIdToLabel = (options?: SecondParameter<typeof customInstance>) => {
	return customInstance<GetProgramIdToLabel200>(
		{ url: `/program-id-to-label`, method: 'GET' },
		options,
	)
}

/**
 * Returns a hash map, input mint as key and an array of valid output mint as values, token mints are indexed to reduce the file size
 * @summary GET /indexed-route-map
 */
export const getIndexedRouteMap = (
	params?: GetIndexedRouteMapParams,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<IndexedRouteMapResponse>(
		{ url: `/indexed-route-map`, method: 'GET', params },
		options,
	)
}

type AwaitedInput<T> = PromiseLike<T> | T

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never

export type GetQuoteResult = NonNullable<Awaited<ReturnType<typeof getQuote>>>
export type PostSwapResult = NonNullable<Awaited<ReturnType<typeof postSwap>>>
export type PostSwapInstructionsResult = NonNullable<
	Awaited<ReturnType<typeof postSwapInstructions>>
>
export type GetProgramIdToLabelResult = NonNullable<Awaited<ReturnType<typeof getProgramIdToLabel>>>
export type GetIndexedRouteMapResult = NonNullable<Awaited<ReturnType<typeof getIndexedRouteMap>>>
