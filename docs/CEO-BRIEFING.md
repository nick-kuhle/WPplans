# CEO briefing — Nick

**WolfPit** is a dated derivatives pit for crypto: mini futures and mini options with expiry, inventory-backed market making, Uniswap-style pools, and a native token used for fees, staking, and first-loss insurance.

This briefing assumes August 2026. Perps are a solved (and crowded) market. Dated vanilla that lists off a pool, never goes naked, and settles like a US futures pit is not.

## What you can show today

The app in this repo is a paper trading desk:

- Spot: ETH-USDC, WOLFPIT-USDC-TEST, WOLFPIT-ETH-TEST
- Mini futures: 0.1 ETH multiplier, Friday + monthly expiry, 5× initial margin, 1:1 vault hedge
- Mini options: user buys; vault sells **covered calls** and **cash-secured puts** only
- LP, farms, WPIT staking
- Visible vault inventory and utilization cap (45%)
- Accelerated clock so you can watch expiry without waiting a week

**It is not a mainnet vault.** Do not tell investors it is.

## Why the sim comes first

1. The insolvency cases (naked short call, unpaired long future, mismatched entries) are easier to kill in a desk than in an incident report.
2. Quant can calibrate spreads on a tick log before gas is spent.
3. Frontend does not change when you flip SIM → TEST → LIVE. Only the adapter does.

## What you will not do until counsel and audits exist

- Take real USDC/ETH from the public
- Deploy spendable WPIT on Ethereum mainnet
- Offer 10× or 0-DTE
- Sell protocol-written naked options
- Let governance vote implied vol

Test-named tokens on a production chain still cost real gas and are irreversible. Prefer an L2 testnet. If you later deploy unfunded TEST ERC-20s on Base, publish addresses and a pause switch.

## Your sequence

1. Entity + foundation split
2. Derivatives counsel (CFTC)
3. GitHub org — commit this repo
4. Hire CTO and Head of Quant
5. Seed on the sim + this plan ($4–8M illustrative)
6. Foundry + testnet
7. Audits
8. One live ETH-USDC vault with tiny caps
9. Flip the desk adapter to LIVE

Capital, relationships, and “no” on risk params are your job. Quoting is not.
