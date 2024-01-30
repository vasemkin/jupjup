# JupJup

## Description

This trading bot is designed to operate on the Solana blockchain, utilizing two distinct strategies: Ping-Pong and DDCA (Dumb Dollar Cost Averaging). It's built to automate trades based on these strategies, aiming to capitalize on market movements and trends.

### Strategies

1. **Ping-Pong**: This strategy involves setting predefined buy and sell prices. The bot buys an asset when its price drops to a certain level and sells when the price rises to a predetermined higher level.

2. **DDCA (Dumb Dollar Cost Averaging)**: In this unique strategy, the bot regularly buys and sells a set amount of tokens (in USD equivalent) regardless of the price, aiming to catch significant market spikes or dips.

## Requirements

-   Node.js
-   pnpm
-   A Solana wallet

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vasemkin/jupjup
    ```

2. Navigate to the project directory:

    ```bash
    cd jupjup
    ```

3. Install dependencies:
    ```bash
    pnpm install
    ```

## Configuration

Create a `.env` file in the project root and configure the following parameters:

-   `NX_SOLANA_PK`: Your wallet private key.
-   `NX_SOLANA_RPC_ENDPOINT`: Solana RPC endpoint URL.
-   `NX_TRADING_MODE`: Trading strat: DDCA or PING_PONG.
-   `NX_USD_BUDGET`: Trading budget for DDCA and ping pong entry.

## Usage

Start the bot using:

```bash
pnpm start
```

The bot will automatically execute trades based on the configured strategies.

## Disclaimer

Trading cryptocurrencies carries a high level of risk, and may not be suitable for all investors. The strategies implemented in this bot are experimental. Please use at your own risk.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.
